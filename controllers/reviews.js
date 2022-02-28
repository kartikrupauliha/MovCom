const Pmovie = require('../models/pmovie');
const Topratedmovie = require('../models/topratedmovie');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const pmovie =await Pmovie.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    pmovie.reviews.push(review);
    await review.save();
    await pmovie.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/popular-movies/${pmovie._id}`);    
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Pmovie.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/popular-movies/${id}`);
}