/**
 * Manual payment service file, this is a payment provider that does literally
 * nothing, payments are controlled by the users that have edit access to the payment
 * object, think of it as cash-only, where you do not have a payment processor
 * so you process your payments by hand
 */

import PaymentProvider, { IPaymentEventObject, PaymentEvent } from "./base/PaymentProvider";
import { logger } from "../../server/logger";

/**
 * The Manual payment service does not much but log the payment events that are
 * occuring, it does not modify payments, and it is what should be used when
 * there is no payment service to layer against
 * 
 * This is basically what you use for cash only services
 */
export class ManualPaymentService extends PaymentProvider<null> {
  public initialize() {
    this.onPayment = this.onPayment.bind(this);

    this.addEventListener(PaymentEvent.CREATED, this.onPayment);
    this.addEventListener(PaymentEvent.DESTROYED, this.onPayment);
    this.addEventListener(PaymentEvent.OPEN, this.onPayment);
    this.addEventListener(PaymentEvent.PAID, this.onPayment);
    this.addEventListener(PaymentEvent.REFUNDED, this.onPayment);
    this.addEventListener(PaymentEvent.DISPUTED, this.onPayment);
    this.addEventListener(PaymentEvent.ACTIVE, this.onPayment);
    this.addEventListener(PaymentEvent.INACTIVE, this.onPayment);
  }

  public onPayment(evObj: IPaymentEventObject) {
    logger.info(
      "Processed payment event " + evObj.event,
      {
        event: evObj.event,
        id: evObj.id,
        version: evObj.version,
        uuid: evObj.uuid,
        payment: evObj.payment,
        hiddentMetadata: evObj.getHiddenMetadata(),
      }
    );
  }
}