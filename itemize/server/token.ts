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

export async function jwtVerify(
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions,
): Promise<object | string> {
  return new Promise<object | string>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err: Error, decoded: object | string) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
