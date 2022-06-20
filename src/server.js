import dotenv from "dotenv";
import tmi from "tmi.js";

dotenv.config();

const { TWITCH_USERNAME, TWITCH_PASSWORD, NODE_ENV } = process.env;

const debug = NODE_ENV === "development";

const client = new tmi.Client({
  channels: [TWITCH_USERNAME],
  options: { debug },
  identity: {
    username: TWITCH_USERNAME,
    password: TWITCH_PASSWORD,
  },
});

const say = (message, { client, channel = TWITCH_USERNAME } = {}) => {
  client.say(channel, `[BOT] ${message}`);
};

client.connect().then(() => {
  //   console.log("Bot is connected to Twitch");
  say("Salut, je viens de me connecter", { client });
});

client.on("message", (channel, tags, message, self) => {
  if (message.toLowerCase() === "!links") {
    say("https://linktr.ee/codiscovery", { client });
  }
});
