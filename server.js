// Production entry point for hosting under cPanel's "Setup Node.js App" (Phusion Passenger) and similar hosts that
// spawn a single JS file directly rather than running an npm script. Passenger sets PORT (sometimes a port number,
// sometimes a unix socket path) and expects the app to listen on exactly that value; `next start` is built for
// normal hosting and doesn't take a handed-in server the same way, so this wraps Next's own programmatic API
// instead — the officially documented "custom server" pattern, and the standard approach for Next.js on Passenger.
//
// Not used by Vercel: Vercel builds and serves the app its own way and ignores this file entirely.
const { createServer } = require("node:http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
  });
