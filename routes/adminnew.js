var express = require('express');
var _ = require('underscore');
var Movie = require('../model/movie');
var router = express.Router();
var Kind = require('../model/kind');

router.post('/', function(req, res, next) {
  var movieObj = req.body;
  var id = movieObj.id;
  var _movie;
 
  if (id) {
    
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      } else {
        _movie = _.extend(movie, movieObj);
        _movie.save(function(err, movie) {
           if (err) {
              console.log(err);
           }

           res.redirect('/detail/' + id);
        });
      }
    });
  } else {
      _movie = new Movie(movieObj);
      
      _movie.save(function(err, movie) {
        var kindName = movie.kind;

        if (err) {
          console.log(err);
        } else {

          Kind.findOne({name: kindName}).exec(function(err, kind) {
            if (err) {
              console.log(err);
            } else{
              kind.movies.push(movie._id);
              kind.save(function(err, kind) {
                if (err) {
                  console.log(err);
                } else {
                  res.redirect('/detail/' + movie._id);
                }
              });
            }
          });
        }

        
      });
  }
});
module.exports = router;