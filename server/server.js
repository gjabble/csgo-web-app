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
    let hitgroups = {
      1: 'head',
      2: 'chest',
      3: 'stomach',
      4: 'left_arm',
      5: 'right_arm',
      6: 'left_leg',
      7: 'right_leg',
    }
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
    const playerName = 'Rainy';

    let overview = {
      scoreBoard: {
        players: []
      },
      rounds: [],
      weapons: {},
      performance: {},
    }


    demo.on('start', () => {
      overview.map = demo.header.mapName;
    });

    demo.gameEvents.on('player_death', (e) => {
      const attacker = demo.entities.getByUserId(e.attacker);
      const attackerName = attacker ? attacker.name : "unnamed";
      if (attackerName === playerName) {
        if (!overview.weapons[e.weapon]) {
          overview.weapons[e.weapon] = {
            kills: 1,
            headshots: 0,
            damage: 0,
            numberFired: 0,
            numberHit: 0,
            accuracy: 0
          }
        } else {
          let prevKills = overview.weapons[e.weapon].kills;
          overview.weapons[e.weapon].kills = prevKills + 1;
          if (e.headshot) {
            let prevHeadshots = overview.weapons[e.weapon].headshots;
            overview.weapons[e.weapon].headshots = prevHeadshots + 1;
          }
        }
      }
    });

    demo.gameEvents.on('round_start', (e) => {
      // let player = demo.players.find((p) => p.name === playerName);
      // let roundNumber = demo.gameRules.roundsPlayed;
      // let index = 0;
      // let round = overview.rounds.find((round, i) => {
      //   index = i;
      //   return round.roundNumber === roundNumber
      // });
      // if (round) {
      //   round.weapons = player.weapons.map(weapon => weapon.itemName);
      //   overview.rounds[index] = round
      // }
    })

    demo.gameEvents.on('player_hurt', (e) => {
      const attacker = demo.entities.getByUserId(e.attacker);
      const attackerName = attacker ? attacker.name : "unnamed";
      if (attackerName === playerName) {
        if (e.hitgroup == 1) {
          if (!overview.performance.headshotHits) {
            overview.performance.headshotHits = 1;
          } else {
            const prevVal = overview.performance.headshotHits;
            overview.performance.headshotHits = prevVal + 1;
          }
        }

        if (!overview.performance.totalHits) {
          overview.performance.totalHits = 1
        } else {
          const prevVal = overview.performance.totalHits;
          overview.performance.totalHits = prevVal + 1;
        }

        if (!overview.weapons[e.weapon]) {
          overview.weapons[e.weapon] = {
            kills: 0,
            headshots: 0,
            damage: e['dmg_health'],
            numberFired: 0,
            numberHit: 1,
            accuracy: 0
          }
        } else {
          let prevDamage = overview.weapons[e.weapon].damage;
          overview.weapons[e.weapon].damage = prevDamage + e['dmg_health'];

          let prevHits = overview.weapons[e.weapon].numberHit;
          overview.weapons[e.weapon].numberHit = prevHits + 1;

          let numberFired = overview.weapons[e.weapon].numberFired;
          let numberHit = overview.weapons[e.weapon].numberHit;
          overview.weapons[e.weapon].accuracy = (numberHit / numberFired) * 100;
        }
      }
    });

    demo.gameEvents.on('weapon_fire', (e) => {
      const attacker = demo.entities.getByUserId(e.userid);
      const attackerName = attacker ? attacker.name : "unnamed";
      e.weapon = e.weapon.slice(7, e.weapon.length);
      if (attackerName === playerName) {
        if (!overview.performance.totalFired) {
          overview.performance.totalFired = 1;
        } else {
          const prevVal = overview.performance.totalFired;
          overview.performance.totalFired = prevVal + 1;
        }
        if (!overview.weapons[e.weapon]) {
          overview.weapons[e.weapon] = {
            kills: 0,
            headshots: 0,
            damage: 0,
            numberFired: 1,
            numberHit: 0,
            accuracy: 0
          }
        } else {
          let prevFired = overview.weapons[e.weapon].numberFired;
          overview.weapons[e.weapon].numberFired = prevFired + 1;

          let numberFired = overview.weapons[e.weapon].numberFired;
          let numberHit = overview.weapons[e.weapon].numberHit;
          overview.weapons[e.weapon].accuracy = (numberHit / numberFired) * 100;
        }

      }
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
      const totalDamage = overview.rounds.map(round => round.damage).reduce((acc, cv) => acc + cv);
      const playerStats = overview.scoreBoard.players.find(player => player.name == playerName);
      const numRounds = overview.rounds.length;
      overview.performance.totalDamage = totalDamage;
      overview.performance.averageDamage = totalDamage / numRounds;
      overview.performance.averageHeadshot = overview.performance.headshotHits / numRounds;
      overview.performance.averageKills = playerStats.kills / numRounds;
      overview.performance.averageAssists = playerStats.assists / numRounds;
      overview.performance.averageDeaths = playerStats.deaths / numRounds;
      overview.performance.overallAccuracy = (overview.performance.totalHits / overview.performance.totalFired) * 100;
      // console.log(JSON.stringify(overview));
      res.send(overview);
    });

    demo.parse(buffer);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
