const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const demofile = require('demofile');
const fs = require('fs');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const bodyParser = require('body-parser');

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
app.use(formidableMiddleware());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/file', (req, res) => {
  fs.readFile(req.files.file.path, (err, buffer) => {
    let reasons = {
      1: 'target_bombed', // t win
      7: 'bomb_defused', // ct win
      8: 'terrorists_killed', // ct win
      9: 'cts_killed', // t win
      12: 'target_saved', // ct win
      17: 'terrorists_surrender', // ct win
      18: 'ct_surrender' // t win
    }
    const demo = new demofile.DemoFile();
    // const playerName = req.fields.playerName;
    const playerName = 'iPlayToLose';

    let overview = {
      scoreBoard: {
        players: []
      },
      rounds: []
    }

    demo.on('start', () => {
      overview.map = demo.header.mapName;
    });

    demo.gameEvents.on('round_end', (e) => {
      let teamT = demo.teams[2];
      let teamCT = demo.teams[3];
      let roundNumber = demo.gameRules.roundsPlayed;
      if (roundNumber > 30) return;
      let player = demo.players.find((p) => p.name === playerName);


      for (const p of teamT.members) {
        if (p.isFakePlayer) {
          continue;
        }
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
        if (p.isFakePlayer) {
          continue;
        }
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
      let winner = player.teamNumber === e.winner;
      let matchStats = player.matchStats[roundNumber - 1];
      overview.rounds.push({
        'roundNumber': demo.gameRules.roundsPlayed,
        'winner': winner,
        'reason': reasons[e.reason],
        'amountSpent': player.cashSpendThisRound,
        'hasHelmet': player.hasHelmet,
        'assists': matchStats.assists,
        'damage': matchStats.damage,
        'equipmentValue': matchStats.equipmentValue,
        'headshotKills': matchStats.headShotKills,
        'killReward': matchStats.killReward,
        'kills': matchStats.kills,
        'timeAlive': matchStats.liveTime,
        'moneySaved': matchStats.moneySaved,
        'objectives': matchStats.objective
      });
    });


    demo.on('end', () => {
      let seconds = demo.currentTime;
      const secondsToMinutes = Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
      overview.gameLength = secondsToMinutes;
      let teamT = demo.teams[2];
      overview.tScore = teamT.scoreFirstHalf + teamT.scoreSecondHalf;
      let teamCT = demo.teams[3];
      overview.ctScore = teamCT.scoreFirstHalf + teamCT.scoreSecondHalf;
      let winningTeam = overview.ctScore > overview.tScore ? 3 : 2;
      let player = demo.players.find((p) => p.name == playerName);
      let winner = player == winningTeam ? true : false;
      overview.winner = winner;
      overview.playerTeam = player.teamNumber;
      res.send(overview);
    });
    demo.parse(buffer);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
