module.exports = function(app) {

  app.get('/home', function(req, res) {
    res.render('home');
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.get('/landing', function(req, res) {
    res.render('landing');
  });

  app.get('/classes', function(req, res) {
    res.render('classes');
  });

  app.post('/login', function(req, res) {
    //basic login
    if (req.body.email && req.body.email === 'user@ucmerced.edu' && req.body.password && req.body.password === 'pass') {
			//req.session.authenticated = true;
			res.redirect('/home');
		} else {
			res.redirect('/login');
		}
  });
}
