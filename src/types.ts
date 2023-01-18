import { IncomingHttpHeaders } from "http";
import "kurier";

declare module "kurier" {
  export interface TransportLayerContext {
    ip?: string;
    headers?: IncomingHttpHeaders;
  }

  export interface ApplicationInstanceInterface {
    transportLayerContext: TransportLayerContext;
  }
}
