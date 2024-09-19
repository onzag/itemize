/**
 * This file contains functions that are used for token validation
 * Itemize uses JWT for simplicity, itemize supports logout all anyway
 * because JWT tokens are sessioned, the reason JWT is used is because
 * tokens can be manufactured based on the jwtKey so other services
 * can be able to communicate with an itemize server easily
 * @module
 */

import jwt from "jsonwebtoken";
import express from "express";
import type { IServerSideTokenDataType } from "./resolvers/basic";
import { ENDPOINT_ERRORS, GUEST_METAROLE, JWT_KEY } from "../constants";
import type { EndpointErrorType } from "../base/errors";
import type { IAppDataType } from "../server";

/**
 * Sign a payload
 * @param payload the payload to sign
 * @param secretOrPrivateKey the secret in question
 * @param options the options
 */
export async function jwtSign(
  payload: string | object | Buffer,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err: Error, encoded: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(encoded);
      }
    });
  });
}

/**
 * Verify and decode a key
 * @param token the token in question
 * @param secretOrPublicKey the key
 * @param options verify options
 */
export async function jwtVerify<T>(
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err: Error, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

/**
 * Verify and decode a key using two keys
 * @param token the token in question
 * @param secretOrPublicKey the key
 * @param secretOrPublicKeyAlt the alternative key (or null)
 * @param options verify options
 */
 export async function jwtVerifyWithAlt<T>(
  token: string,
  secretOrPublicKey: jwt.Secret,
  secretOrPublicKeyAlt: jwt.Secret,
  options?: jwt.VerifyOptions,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err: Error, decoded: any) => {
      if (err) {
        if (secretOrPublicKeyAlt) {
          jwt.verify(token, secretOrPublicKeyAlt, options, (err2: Error, decoded2: any) => {
            if (err2) {
              reject(err2);
            } else {
              resolve(decoded2);
            }
          });
        } else {
          reject(err);
        }
      } else {
        resolve(decoded);
      }
    });
  });
}


/**
 * Decode a JWT token and does not verify whether it's valid
 * @param token the token in question
 * @param options the options
 */
export function jwtDecode<T>(
  token: string,
  options?: jwt.DecodeOptions,
): T {
  return jwt.decode(token, options) as T;
}

export async function jwtVerifyRequest(
  appData: IAppDataType,
  req: express.Request,
): Promise<{verified: boolean; err: EndpointErrorType, info: IServerSideTokenDataType;}> {
  const token = req.headers.token;

  if (!token) {
    return {
      verified: false,
      err: {
        code: ENDPOINT_ERRORS.MUST_BE_LOGGED_IN,
        message: "User did not provide a token",
      },
      info: {
        id: null,
        role: GUEST_METAROLE,
      },
    };
  }
  
  let infoRaw: IServerSideTokenDataType;
  try {
    infoRaw = await jwtVerify<IServerSideTokenDataType>(token as string, await appData.registry.getJWTSecretFor(JWT_KEY));
  } catch {
    return {
      verified: false,
      err: {
        code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
        message: "User did not provide valid credentials",
      },
      info: null,
    };
  }

  let isInValid = false;
  if (!infoRaw.custom || infoRaw.isRealUser) {
    isInValid = (
      typeof infoRaw.id !== "string" ||
      typeof infoRaw.role !== "string" ||
      typeof infoRaw.sessionId !== "number"
    );
  } else {
    isInValid = typeof infoRaw.role !== "string";
  }

  if (isInValid) {
    return {
      verified: false,
      err: {
        code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
        message: "Credentials deemed invalid",
      },
      info: null,
    };
  }

  return {
    verified: true,
    err: null,
    info: infoRaw,
  };
}