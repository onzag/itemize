import { ServiceProviderType } from ".";
import AnalyticsProvider from "./base/AnalyticsProvider";

export class ElasticAnalyticsService extends AnalyticsProvider<null> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }
}
