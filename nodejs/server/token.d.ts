/// <reference types="node" />
import jwt from "jsonwebtoken";
export declare function jwtSign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions): Promise<string>;
export declare function jwtVerify<T>(token: string, secretOrPublicKey: jwt.Secret, options?: jwt.VerifyOptions): Promise<T>;
