const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movie.router.js');
const userRouter = require('./routes/user.router.js');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static('build'));

app.use('/api/movie', movieRouter);
app.use('/',  userRouter);

app.listen(port, function () {
  console.log('Listening on port: ', port);
});
