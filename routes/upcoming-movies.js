const express = require('express');
const router = express.Router();
const pmovies = require('../controllers/popular-movies');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Upcomingmovie = require('../models/upcomingmovie');
const { isLoggedIn } = require('../middleware');
const axios = require('axios');


router.get('/', catchAsync(async(req, res) => {
        const api = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=64c6d462a467b98735039f2a57970435&language=en-US&page=1');
        // const movies = api.data;

        const movies = await Upcomingmovie.find({});
        res.render('upcoming-movies/index', { movies })

        // await Upcomingmovie.deleteMany({});
        // for(let i = 0; i < movies.results.length; i++){
        // const movie = new Upcomingmovie({ 
        //     author: '61ec2ba4a3ccc6312f81b4d8',
        //     title: `${movies.results[i].title}`,
        //     release_date: `${movies.results[i].release_date}`, 
        //     overview: `${movies.results[i].overview}`,
        // //     image: 'https://source.unsplash.com/collection/483251'
        //     image: `https://image.tmdb.org/t/p/w500${movies.results[i].poster_path}`
        // });
        // console.log(movie);
        // await movie.save();
    }));

router.get('/:id', catchAsync(async(req, res) => {
        const api = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=64c6d462a467b98735039f2a57970435&language=en-US&page=1');
        const movies = api.data;

        const pmovie = await Upcomingmovie.findById(req.params.id).populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            }).populate('author');
            if(!pmovie) {
                req.flash('error', 'Cannot find that campground!');
                return res.redirect('/upcoming-movies');
            }
        //     console.log(pmovie._id)
            res.render('upcoming-movies/show', { pmovie });

        // res.render('toprated-movies/show', { movies });
}));

module.exports = router;