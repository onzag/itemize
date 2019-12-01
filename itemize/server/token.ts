import jwt from "jsonwebtoken";

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
