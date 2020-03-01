import Mailgun from "mailgun-js";

export function setupMailgun(options: Mailgun.ConstructorParams) {
  return Mailgun(options);
}