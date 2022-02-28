// <% layout('layouts/boilerplate') %> 

const express = require('express');
const router = express.Router();
const pmovies = require('../controllers/popular-movies');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Pmovie = require('../models/pmovie');
const { isLoggedIn } = require('../middleware');
const popular = require('../seeds/popular.json');



router.get('/', catchAsync(pmovies.index


    // await Pmovie.deleteMany({});
    // for(let i = 0; i < movies.length; i++){
    //     const movie = new Pmovie({ 
    //         title: `${movies[i].title}`,
    //         release_date: `${movies[i].release_date}`, 
    //         overview: `${movies[i].overview}`,
    //         poster_path: `${movies[i].poster_path}`
    //     });
    //     await movie.save();
    // }

    
));

router.get('/:id', catchAsync(pmovies.showPmovie
    ));

module.exports = router;