// Dependencies
const express = require('express');

const app = express();

const PORT = 8000;


// Routes
app.get('/', (req, res) => {
  res.send("Henlo World");
});




// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));