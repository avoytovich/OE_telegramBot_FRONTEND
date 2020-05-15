const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3050;

app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => console.log('Listening server on port ' + PORT));
