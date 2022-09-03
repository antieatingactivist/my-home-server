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

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "./index.html"));
// });

fs.readdir(__dirname+"/public", (err, files) => {
  if(err) console.log(err);
  else {
    
    let fileList = "";
    files.forEach(project => {
      if (!project.includes(".")) {
        
        fileList += `<p><a href="/${project}">${project}</a></p>`;
        console.log(project);
        const port = dotenv.config({
          path: path.join("./public/" + project + "/.env")
        }).parsed.PORT;
        console.log(port);
        app.get("/" + project, function(req, res, next) {
          res.redirect(`https://localhost:${port}/`);
        });
      }
    });

    


    app.get('/', (req, res) => {
      res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body {
                    color: #ffffff;
                    background-color: #000000;
    
                }
                a {
                  color: #ffffff;
                }
            </style>
        </head>
        <body>
            ${fileList}
        </body>
        </html>
      
      
      `);
    });


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
