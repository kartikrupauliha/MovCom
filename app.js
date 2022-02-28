const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Pmovie = require('./models/pmovie');
const popular = require('./seeds/popular.json');
const catchAsync = require('./utils/catchAsync');
const Joi = require('joi');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const Review = require('./models/review');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const axios = require('axios');


const userRoutes = require('./routes/users');
const topratedmovieRoutes = require('./routes/toprated-movies');
const upcomingmovieRoutes = require('./routes/upcoming-movies');
const popularmovieRoutes = require('./routes/popular-movies');
const reviewRoutes = require('./routes/reviews');
const { use } = require('passport');


mongoose.connect('mongodb://localhost:27017/movie-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});   

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));



const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'coltttt@gmail.com', username: 'colttt'})
    const newUser = await User.register(user, 'chicken')
    res.send(newUser);
})

// const validateCampground = (req, res, next) => {

// }

app.use('/', userRoutes);
app.use('/toprated-movies', topratedmovieRoutes);
app.use('/toprated-movies/:id/reviews', reviewRoutes);
app.use('/popular-movies', popularmovieRoutes);
app.use('/popular-movies/:id/reviews', reviewRoutes);
app.use('/upcoming-movies', upcomingmovieRoutes);
app.use('/upcoming-movies/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})