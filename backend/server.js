const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex',true);
mongoose.connect('mongodb://localhost:27017/WebApp', {useNewUrlParser : true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connecting error'));
db.once('open', function() {
  console.log('Connected to mongo server');
});

app.get('/', async(req, res, next) => {
  console.log('get successful');
  res.status(200).json({message: 'success'});
})

app.post('v1/sign-up', async(req, res, next) => {
  console.log(req.body);
})

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development'? err : {};
  const status = err.status || 500;

  res.status(status).json({error : {message : error.message} });
  console.error(err);
})

const port = app.get('port') || 3000;
app.listen(port, () => console.log('server is running on port: ' + port));
