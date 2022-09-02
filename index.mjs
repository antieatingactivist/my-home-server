import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpApp = express();
const PORT = 443;


app.enable('trust proxy');

// app.use('/RGB-strip-controller', express.static(path.join(__dirname, "../build")));

// Routes
httpApp.get("*", function(req, res, next) {
  res.redirect("https://" + req.headers.host + req.path);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});


fs.readdir(__dirname+"/public", (err, files) => {
  if(err) console.log(err);
  else {
    files.forEach(project => {
      dotenv.config({
        path: path.join("./public/" + project + "/.env")
      });
      console.log(project);
      console.log(process.env.PORT);
      app.get("/" + project, function(req, res, next) {
        res.redirect(`http://localhost:${process.env.PORT}/`);
        // res.redirect(`http://localhost:3001/`);
      });
    })
  }
})


// Listeners
https.createServer({
  key: fs.readFileSync(process.env.KEY_PEM),
  cert: fs.readFileSync(process.env.CERT_PEM),
},app)
  .listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
    console.log(process.env);
  });
//redirect server
http.createServer(httpApp)
  .listen(80, function() {
    console.log("Express TTP server listening on port 80");
  });
