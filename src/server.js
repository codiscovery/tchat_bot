import dotenv from "dotenv";

import path from "node:path";
import * as url from "node:url";

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifySocket from "@fastify/websocket";

dotenv.config();

const { PORT, NODE_ENV } = process.env;

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

const debug = NODE_ENV === "development";

let logger = true;
if (debug) {
  logger = {
    level: "trace",
  };
}

// Create a server instance
const fastify = Fastify({ logger });

// Server setup

fastify.register(fastifySocket);
fastify.register(async function (fastify) {
  fastify.get(
    "/socket",
    { websocket: true },
    (connection /* SocketStream */, req /* Fastify Request */) => {
      connection.socket.on("message", (rawSocketData) => {
        const socketData = JSON.parse(rawSocketData.toString());
        // message.toString() === 'hi from client!'
        if (socketData.type === "join") {
          fastify.log.trace(
            `received message from client: ${socketData.message}`
          );
        }
      });
    }
  );
});

fastify.register(fastifyStatic, {
  root: path.join(dirname, "..", "public"),
  prefix: "/overlay",
});

// Server routes

fastify.get("/", async (request, response) => {
  response.type("application/json").code(200);
  return { name: "Codiscovery t'chat bot" };
});

// Server start
fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    throw err;
  }
  fastify.log.info(`server listening on ${address}`);
});
