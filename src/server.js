import dotenv from "dotenv";
import tmi from "tmi.js";

dotenv.config();

const { TWITCH_USERNAME, TWITCH_PASSWORD, NODE_ENV } = process.env;

const debug = NODE_ENV === "development";

const client = new tmi.Client({
  channels: ["jenaiccambre"],
  options: { debug },
  identity: {
    username: TWITCH_USERNAME,
    password: TWITCH_PASSWORD,
  },
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (message === "!links") {
    client.say(channel, "https://linktr.ee/codiscovery");
  }
});
