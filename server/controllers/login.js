const { join } = require('path');

const db = require(join(__dirname, '..', 'db'));

const get = (req, res, next) => {
  const message = req.flash('status')[0];

  res.render('login', {
    msglogin: message,
  });
};


const post = (req, res, next) => {
  const { email, password } = req.body;
  const admin = db
    .get('users')
    .find({ isAdmin: true })
    .value();

  if (email === admin.email && password === admin.password) {
    return res.redirect('/admin');
  }

  db
    .get('users')
    .push({
      email,
      password,
      isAdmin: false
    })
    .write();
  
  req.flash('status', 'You are not an admin!');
  res.redirect('/login');
};

module.exports = {
  get,
  post,
};