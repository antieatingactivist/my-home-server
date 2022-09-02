
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import https from 'https';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 8000;

app.use('/RGB-strip-controller', express.static(path.join(__dirname, "../build")));
app.use(function(request, response, next) {

  if (process.env.NODE_ENV != 'development' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});




// Listener
https
  .createServer(
    {
        key: fs.readFileSync(process.env.KEY_PEM),
        cert: fs.readFileSync(process.env.CERT_PEM),
    },

    app
    
    
    )
  .listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`)
  });

// app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));