// Dependencies
const express = require('express');
const path = require('path');

const app = express();

const PORT = 8000;

app.use('/RGB-strip-controller', express.static(path.join(__dirname, "../build")));
// Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });






// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));