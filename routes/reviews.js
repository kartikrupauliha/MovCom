const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');
const Pmovie = require('../models/pmovie');
const Review = require('../models/review');
const req = require('express/lib/request');




router.post('/', isLoggedIn, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;
