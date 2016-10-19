// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

var config = require('./config');
var routes = require('./app/routes');
var Question = require('./models/question');
var Answer = require('./models/answer');
var request = require('request');

var app = express();
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * GET /api/question/random
 * Returns 1 random question that have not been answered yet.
 */

app.get('/api/question/random', function(req, res, next) {

  var minimum = 1;
  var maximum = 4;
  var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  Question.find({_id: randomNumber})
    .where('answered', 0)
    .limit(1)
    .populate('answers')
    .exec(function(err, question) {
      if (err) return next(err);

      if (!question) {
        return res.status(404).send({ message: 'Question not found.' });
      }
      res.send(question);
    });
});


/**
 * GET /api/questions/count
 * Returns the total number of questions.
 */

app.get('/api/questions/count', function(req, res, next) {
  Question.count({}, function(err, count) {
    if (err) return next(err);
    res.send({ count: count });
  });
});

/**
 * GET /api/questions/search
 * Looks up a question. (case-insensitive)
 */
app.get('/api/characters/search', function(req, res, next) {
  var questionName = new RegExp(req.query.question, 'i');

  Question.findOne({ question: questionName }, function(err, question) {
    if (err) return next(err);

    if (!question) {
      return res.status(404).send({ message: 'Question not found.' });
    }

    res.send(question);
  });
});

/**
 * GET /api/questions/load
 * Loads one question at a time.
 */

app.get('/api/questions/load/:id', function(req, res, next) {


  var q = {
    1: {
        '_id': 1,
        'question': 'Is this hard?',
        'answered': 0
    },
    2: {
        '_id': 2,
        'question': 'Who is going to win the SuperBowl in 2017?',
        'answered': 0
    },
    3: {
        '_id': 3,
        'question': 'Which is your favourite Tesla Car ?',
        'answered': 0
    },
    4: {
        '_id': 4,
        'question': 'Which is your favourite Color ?',
        'answered': 0
    }
  };

  var a = {
    1: {
        'aid': 1,
        '_qid': 1,
        'answer': 'Yes',
        'count': 0
    },
    2: {
        'aid': 2,
        '_qid': 1,
        'answer': 'No',
        'count': 0
    },
    3: {
        'aid': 3,
        '_qid': 1,
        'answer': 'Both',
        'count': 0
    },
    4: {
        'aid': 4,
        '_qid': 1,
        'answer': 'None',
        'count': 0
    },
    5: {
        'aid': 5,
        '_qid': 2,
        'answer': 'Eagles',
        'count': 0
    },
    6: {
        'aid': 6,
        '_qid': 2,
        'answer': 'Patriots',
        'count': 0
    },
    7: {
        'aid': 7,
        '_qid': 2,
        'answer': 'Seahawks',
        'count': 0
    },
    8: {
        'aid': 8,
        '_qid': 2,
        'answer': 'Broncos',
        'count': 0,
    },
    9: {
        'aid': 9,
        '_qid': 3,
        'answer': 'Tesla X',
        'count': 0,
    },
    10: {
        'aid': 10,
        '_qid': 3,
        'answer': 'Tesla S',
        'count': 0,
    },
    11: {
        'aid': 11,
        '_qid': 3,
        'answer': 'Tesla 3',
        'count': 0,
    },
    12: {
        'aid': 12,
        '_qid': 3,
        'answer': 'Tesla 2017',
        'count': 0,
    },
    13: {
        'aid': 13,
        '_qid': 4,
        'answer': 'Red',
        'count': 0,
    },
    14: {
        'aid': 14,
        '_qid': 4,
        'answer': 'Blue',
        'count': 0,
    },
    15: {
        'aid': 15,
        '_qid': 4,
        'answer': 'Green',
        'count': 0,
    },
    16: {
        'aid': 16,
        '_qid': 4,
        'answer': 'White',
        'count': 0,
    }
  }

  var qid = req.params.id;
  var aid = (4*qid)-3;

  async.waterfall([
         function(callback){

           var question = new Question({ _id: q[qid]._id, question: q[qid].question, answered: 0 });

           var answer = new Answer({
             'aid': a[aid].aid,
             '_qid': question._id,
             'answer': a[aid].answer,
             'count': 0
           });

           question.answers.push(answer);
           question.save(function (err) {
             answer.save(function (err) {
                  callback(err);
             });
          });

         },
         function(callback){

           Question.findOne({ _id: q[qid]._id }, function(err, question) {

             var answer = new Answer({
               'aid': a[aid+1].aid,
               '_qid': question._id,
               'answer': a[aid+1].answer,
               'count': 0
             });

            question.answers.push(answer);
            question.save(function (err) {
              answer.save(function (err) {
                   callback(err);
              });
           });

          });

         },
         function(callback){

           Question.findOne({ _id: q[qid]._id }, function(err, question) {

             var answer = new Answer({
               'aid': a[aid+2].aid,
               '_qid': question._id,
               'answer': a[aid+2].answer,
               'count': 0
             });

            question.answers.push(answer);
            question.save(function (err) {
              answer.save(function (err) {
                   callback(err);
              });
           });

          });

         },
         function(callback){

           Question.findOne({ _id: q[qid]._id }, function(err, question) {

             var answer = new Answer({
               'aid': a[aid+3].aid,
               '_qid': question._id,
               'answer': a[aid+3].answer,
               'count': 0
             });

            question.answers.push(answer);
            question.save(function (err) {
              answer.save(function (err) {
                   callback(err);
              });
           });

          });

         }],function(err){
           if(err) return next(err);
            Question.findOne({_id: q[qid]._id})
            .populate("answers")
            .exec(function (err, question) {
             res.send(question);
        });
   });

});

/**
 * GET /questions/:id
 * Returns detailed question information.
 */
app.get('/api/questions/:id', function(req, res, next) {

  var id = req.params.id;

  Question.findOne({_id: id})
  .populate("answers")
  .exec(function (err, question) {
      res.send(question);
  });

});

/**
 * POST /api/questions
 * Adds new question to the database.
 */

app.post('/api/questions', function(req, res, next) {

  var ques = req.body.question;
  var option1 = req.body.option1;
  var option2 = req.body.option2;
  var option3 = req.body.option3;
  var option4 = req.body.option4;
  var qid = req.body.qid;

  var aid = (4*qid)-3;

  async.waterfall([
         function(callback){

           var question = new Question({ _id: qid, question: ques, answered: 0 });

           var answer = new Answer({
             'aid': aid,
             '_qid': question._id,
             'answer': option1,
             'count': 0
           });

           question.answers.push(answer);
           question.save(function (err) {
             answer.save(function (err) {
                  callback(err);
             });
          });

         },
         function(callback){

           Question.findOne({ _id: qid }, function(err, question) {

             var answer = new Answer({
               'aid': aid+1,
               '_qid': question._id,
               'answer': option2,
               'count': 0
             });

            question.answers.push(answer);
            question.save(function (err) {
              answer.save(function (err) {
                   callback(err);
              });
           });
          });

         },
         function(callback){

           Question.findOne({ _id: qid }, function(err, question) {

             var answer = new Answer({
               'aid': aid+2,
               '_qid': question._id,
               'answer': option3,
               'count': 0
             });

            question.answers.push(answer);
            question.save(function (err) {
              answer.save(function (err) {
                   callback(err);
              });
           });

          });

         },
         function(callback){

           Question.findOne({ _id: qid }, function(err, question) {

             var answer = new Answer({
               'aid': aid+3,
               '_qid': question._id,
               'answer': option4,
               'count': 0
             });

            question.answers.push(answer);
            question.save(function (err) {
              answer.save(function (err) {
                   callback(err);
              });
           });
          });

         }],function(err){
           if(err) return next(err);
            Question.findOne({_id: qid})
            .populate("answers")
            .exec(function (err, question) {
                console.log(question);
                res.send({ message: question.question + ' has been added successfully!' });
        });
   });


});



/**
 * GET /api/stats
 * Returns answers statistics.
 */
app.get('/api/stats', function(req, res, next) {

  Answer.find()
    .sort('-count')
    .limit(10)
    .select('answer count')
    .exec(function(err, answers) {
      if (err) return next(err);
      res.send(answers)
    });

});


/**
 * POST /api/report
 * Reports an answer to question.
 */
app.put('/api/report', function(req, res, next) {
  var id = req.body.id;
  var userAnswer = req.body.userAnswer;

  Question.findOne({_id: id}, function(err,question){
    if (err) return next(err);
    if (!question) {
      return res.status(404).send({ message: 'Question not found.' });
    }
    question.answered++;
    Answer.findOne({ aid: userAnswer }, function(err, answer) {
      if (err) return next(err);
      if (!answer) {
        return res.status(404).send({ message: 'Question not found.' });
      }
      answer.count++;

      answer.save(function(err) {
          if (err) return next(err);
          question.save(function(err) {
              if (err) return next(err);
              res.send({message : 'Question has been answered.' });
              });
          });

        });
      });

});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
