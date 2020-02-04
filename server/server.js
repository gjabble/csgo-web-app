const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const demofile = require('demofile');
const fs = require('fs');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
app.use(formidableMiddleware());

app.post('/file', (req, res) => {
  fs.readFile(req.files.file.path, (err, buffer) => {
    const demo = new demofile.DemoFile();
    let overview = {
      scoreBoard: {
        players: []
      }
    }
    demo.gameEvents.on('round_end', () => {
      let teamT = demo.teams[2];
      let teamCT = demo.teams[3];
      let roundNumber = demo.gameRules.roundsPlayed;
      if (roundNumber > 30) return;

      for (const p of teamT.members) {
        let playerData = overview.scoreBoard.players.find(player => player.name === p.name);
        let index = overview.scoreBoard.players.indexOf(playerData);
        if (index === -1) {
          overview.scoreBoard.players.push({
            name: p.name,
            kills: p.kills,
            assists: p.assists,
            deaths: p.deaths,
            team: 't'
          });
        } else {
          overview.scoreBoard.players[index] = {
            name: p.name,
            kills: p.kills,
            assists: p.assists,
            deaths: p.deaths,
            team: 't'
          }
        }
      }
      for (const p of teamCT.members) {
        let playerData = overview.scoreBoard.players.find(player => player.name === p.name);
        let index = overview.scoreBoard.players.indexOf(playerData);
        if (index === -1) {
          overview.scoreBoard.players.push({
            name: p.name,
            kills: p.kills,
            assists: p.assists,
            deaths: p.deaths,
            team: 'ct'
          });
        } else {
          overview.scoreBoard.players[index] = {
            name: p.name,
            kills: p.kills,
            assists: p.assists,
            deaths: p.deaths,
            team: 'ct'
          }
        }
      }
    });
    demo.on('end', () => {
      res.send(overview);
    });
    demo.parse(buffer);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
