# Twitch bot

- [x] Connect to twitch stream
- [x] Detect someone says !links (=> link.tree)
- [x] Deploy on Vercel/Heroku

  - [x] CANCELED: Deploy on Vercel (base Node server) : https://blog.devsharma.live/deploy-a-node-server-to-vercel
  - [x] Deploy on Heroku

- [x] Set up logger

- [ ] Detect !wow to start sound
- [ ] Connect WS to Twitch client (`src/twitch/server.js`)
- [ ] Twitch client to export? (or send?) `client.on('message', ...)` as commands

  - [ ] Soclet Server
    - [ ] make a .send method that will always JSON.stringify when sending
    - [ ] make a .send method that will always JSON.stringify when receiving
    - [ ] socket data : { type : "action", name: "playsound", "file": "mario_letsgo.mp3" }
  - [ ] Socket Client
    - [ ] socket.on (message from back)
      - [ ] modify audio src
      - [ ] play audio

- [ ] Convert to TS
- [ ] Record what has been said
- [ ] Connect to MongoDB

- [ ] Create page to add a PR: https://github.com/Evavic44/portfolio-ideas/blob/main/CONTRIBUTING.md
