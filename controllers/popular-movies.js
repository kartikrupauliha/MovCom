const Pmovie = require('../models/pmovie');
const popular = require('../seeds/popular.json');


module.exports.index = async (req, res) => {
    let movies = await Pmovie.find({});
    res.render('popular-movies/index', { movies })

    // const movies = popular.movies;
    // await Pmovie.deleteMany({});
    // for(let i = 0; i < movies.length; i++){
    //     const movie = new Pmovie({ 
    //         author: '61ec2ba4a3ccc6312f81b4d8',
    //         title: `${movies[i].title}`,
    //         release_date: `${movies[i].release_date}`, 
    //         overview: `${movies[i].overview}`,
    //         // image: 'https://source.unsplash.com/collection/483251'
    //         image: `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`
    //     });
    //     // console.log(movie);
    //     await movie.save();
    // }
}

module.exports.showPmovie = async (req, res) => {
    const pmovie = await Pmovie.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!pmovie) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/popular-movies');
    }
    res.render('popular-movies/show', { pmovie });
}