import { IAppDataType } from "../../server";
import PaymentProvider from "./base/PaymentProvider";
import Stripe from "stripe";
import { PaymentStatusType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import express from "express";

const zeroDecimalCurrencies = [
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "JPY",
  "KMF",
  "KRW",
  "MGA",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
];

interface IStripeConfig {
  apiKey: string;
  endpointSecret: string;
}

export class StripeService extends PaymentProvider<IStripeConfig> {
  private stripe: Stripe;
  public initialize() {
    this.stripe = new Stripe(this.config.apiKey, {
      apiVersion: null,
    });
  }
  public getRouter(appData: IAppDataType) {
    const router = this.expressRouter();

    // get a payment intent
    router.get("/payment-intent/:uuid", async (req, res) => {
      try {
        const uuid = req.params.uuid;
        const uuidInfo = this.unwrapUUIDFor(uuid);
        const payment = await this.retrievePaymentObject(uuidInfo);
        if (payment && payment.value) {
          const isZeroDecimal = zeroDecimalCurrencies.includes(
            payment.value.currency
          );
          const actualAmount = isZeroDecimal
            ? payment.value.amount
            : payment.value.amount * 100;

          const paymentIntent = await this.stripe.paymentIntents.create({
            amount: actualAmount,
            currency: payment.value.currency.toLowerCase(),
            metadata: {
              paymentUUID: uuid,
            },
          });

          res.status(200).end(paymentIntent.client_secret);
        } else {
          res.status(404).end();
        }
      } catch (err) {
        res.status(400).end();
      }
    });

    router.post(
      "/webhook",
      express.raw({
        type: "application/json",
      }),
      (req, res) => {
        const sig = req.headers["stripe-signature"];
        try {
          const event = this.stripe.webhooks.constructEvent(
            req.body,
            sig,
            this.config.endpointSecret
          );

          switch (event.type) {
            case "payment_intent.succeeded":
              const paymentIntent = event.data.object as Stripe.PaymentIntent;
              const paymentUUID = paymentIntent.metadata.paymentUUID;
              this.changePaymentStatus(PaymentStatusType.PAID, paymentUUID);
              break;
          }

          res.end(200);
        } catch {
          res.end(403);
        }
      }
    );

    return router;
  }
}
