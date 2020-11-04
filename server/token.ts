/**
 * This file contains functions that are used for token validation
 * Itemize uses JWT for simplicity, itemize supports logout all anyway
 * because JWT tokens are sessioned, the reason JWT is used is because
 * tokens can be manufactured based on the jwtKey so other services
 * can be able to communicate with an itemize server easily
 * @packageDocumentation
 */

import jwt from "jsonwebtoken";

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
