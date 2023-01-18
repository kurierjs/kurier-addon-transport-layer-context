# kurier-addon-transport-layer-context

An addon to inject the client's IP address and request headers from your transport layer.

## Installation

```bash
$ npm install @kurier/addon-transport-layer-context
```

## Usage

```ts
// In your application definition (app.ts):
import TransportLayerContextAddon from "kurier-addon-transport-layer-context";

// ...
app.use(TransportLayerContextAddon);
```

## Motivation

As you may have noticed, Kurier takes separation of concerns quite seriously, and allows no interactions between say, the HTTP transport layer and a processor. However, there are a _few_ use cases where you might need, for instance, the client's IP address, such as geocoding. Since 1.0.0, all processors in Kurier holds an `appInstance` property, a reference to the current instance of the application, where an operation is taking place.

This addon implements a new member for the ApplicationInstance class, called `transportLayerContext` with two properties, available depending on what you're using (Express, Koa, Vercel or WebSockets):

- `ip`: a `string` containing the remote client's IP address (it could be IPv4, IPv6, it could come from `remoteAddress` or from the `X-Forwarded-For` header, it really depends on the transport middleware you're using).
- `headers`: a `dictionary` containing all available headers from the original request (it works both for HTTP and WebSockets, information available may vary according to the protocol you're using).

You can access this information at any given point in your processor like this:

```ts
const { ip, headers } = this.appInstance.transportLayerContext;
// Do stuff with ip and/or headers...
```
