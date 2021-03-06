const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authController = require('./controllers/authController');
const authRouter = require('./routes/authRouter');
const restRouter = require('./routes/restRouter');
const apiRouter = require('./routes/apiRouter');
const favRouter = require('./routes/favRouter');
const barRouter = require('./routes/barRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(authController.receiveToken);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


// app.use('/', restRouter);

app.use('/restaurants', restRouter);
app.use('/api', apiRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
})
