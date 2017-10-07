var authController =  require('./authcontroller.js');

module.exports = function(app, passport){
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/signup'
    }));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/scores', authController.scores);

    app.get('/logout', authController.logout);

    //route for posting to signin
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin'
    }))

    // 404 page route
    app.get('*', function(req, res){
        res.render('404');
      });

    //protects the dashboard route
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/signin')
        }
    }

}