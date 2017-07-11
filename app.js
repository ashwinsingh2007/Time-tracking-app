var express = require('express'),
    passport = require('passport'),
    util = require('util'),
    path = require('path'),
    FacebookStrategy = require('passport-facebook').Strategy,
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./configuration/config'),
    apicall = require('./routes/APIroutes'),
    mysql = require('mysql'),
    app = express();

require('./configuration/passport')(passport);
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing
app.use(session({ secret: 'peopleGroove', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', apicall);
app.get('/', function(req, res) {
    const setcookie = 'hell';
    res.set('Set-Cookie', setcookie);
    res.sendFile(path.join(__dirname, './views', 'index.html'));
});

app.get('/account', ensureAuthenticated, function(req, res) {
    res.render('account', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

app.listen(3000);