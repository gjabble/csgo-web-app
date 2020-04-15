const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const demofile = require('demofile');
const fs = require('fs');
const formidableMiddleware = require('express-formidable');
const User = require("../../models/User");
const { v4: uuidv4 } = require('uuid');

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        ign: req.body.ign,
        email: req.body.email,
        password: req.body.password1
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({
              firstname: user.firstname,
              lastname: user.lastname,
              ign: user.ign,
              email: user.email,
              date: user.date
            }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          ign: user.ign
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get('/replay', (req, res) => {
  const replayid = req.query.replayid;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token);
  User.findById(decoded.id).then(user => {
    if (user) {
      const replay = user.replays.find((replay) => replay.id === replayid);
      res.send(replay);
    } else {
      res.send({});
    }
  });
});

router.get('/uploads', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token);
  User.findById(decoded.id).then(user => {
    if (user) {
      const response = [];
      for (const replay of user.replays) {
        response.push({
          id: replay.id,
          map: replay.map,
          gameLength: replay.gameLength,
          tScore: replay.tScore,
          ctScore: replay.ctScore,
          winner: replay.winner,
          playerTeam: replay.playerTeam,
        });
      }
      console.log(response);
      res.send(response);
    } else {
      res.send([]);
    }
  });
});

router.post('/upload', formidableMiddleware(), (req, res) => {
  fs.readFile(req.files.file.path, (err, buffer) => {
    console.log(req.fields);
    let hitgroups = {
      1: 'head',
      2: 'chest',
      3: 'stomach',
      4: 'leftarm',
      5: 'rightarm',
      6: 'leftleg',
      7: 'rightleg',
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
      accuracy: {}
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

    demo.gameEvents.on('player_hurt', (e) => {
      const attacker = demo.entities.getByUserId(e.attacker);
      const attackerName = attacker ? attacker.name : "unnamed";
      if (attackerName === playerName) {
        if (!overview.accuracy[e.weapon]) {
          overview.accuracy[e.weapon] = {
            head: 0,
            chest: 0,
            stomach: 0,
            leftarm: 0,
            rightarm: 0,
            leftleg: 0,
            rightleg: 0
          };
          overview.accuracy[e.weapon][hitgroups[e.hitgroup]] = 1;
        } else {
          let prev = overview.accuracy[e.weapon][hitgroups[e.hitgroup]];
          overview.accuracy[e.weapon][hitgroups[e.hitgroup]] = prev + 1;
        }



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
        'roundNumber': roundNumber,
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
      // save to database 

      User.findById(req.fields.userid).then(user => {
        if (user) {
          overview.id = uuidv4();
          user.replays.push(overview);
          user
            .save()
            .then(user => {
              res.send(overview);
            })
            .catch(err => {
              res.send(overview);
            });
        } else {
          res.send(overview);
        }
      });
    });

    demo.parse(buffer);
  });
});

module.exports = router;