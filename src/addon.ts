import { Addon, ApplicationInstanceInterface } from "kurier";
import { getClientIp, Request } from "request-ip";

export class TransportLayerContextAddon extends Addon {
  async install() {
    this.app.hook("beforeRequestHandling", async (appInstance: ApplicationInstanceInterface, request: Request) => {
      const ip = getClientIp(request);
      appInstance.transportLayerContext = {
        ip,
        headers: request.headers,
      };
    });
  }
}
