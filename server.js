import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision"
import Cookie from "@hapi/cookie";
import path from "path";
import Handlebars from "handlebars";
import Joi from "joi";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js"
import { accountsController } from "./controllers/accounts-controller.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  await server.register(Vision);
  await server.register(Cookie);
  server.validator(Joi);
  server.route(webRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  db.init();
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "playtime",
      password: "secretpasswordnotrevealedtoanyone",
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");
}

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
