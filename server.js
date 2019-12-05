const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const demofile = require('demofile');
const fs = require('fs');
const cors = require('cors');
const formidable = require('formidable')

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));

app.post('/file', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err);
      throw err
    }
    fs.readFile(files.file.path, (err, buffer) => {
      const demo = new demofile.DemoFile();
      let resp = [];
      demo.gameEvents.on("player_death", e => {
        const victim = demo.entities.getByUserId(e.userid);
        const victimName = victim ? victim.name : "unnamed";

        const attacker = demo.entities.getByUserId(e.attacker);
        const attackerName = attacker ? attacker.name : "unnamed";

        const headshotText = e.headshot ? " HS" : "";
        resp.push({
          message: `${attackerName} [${e.weapon}${headshotText}] ${victimName}`,
        });
      });
      demo.on('end', e => {
        res.send(resp);
      });
      demo.parse(buffer);
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
