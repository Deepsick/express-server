const { join } = require('path');

const db = require(join(__dirname, '..', 'db'));

const validatorPath = join(__dirname, '..', 'validators', 'login');
const loginValidator = require(validatorPath);

const get = (req, res, next) => {
  const message = req.flash('status')[0];

  res.render('login', {
    msglogin: message,
  });
};


const post = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginValidator.validate({ email, password });

  if (error) {
    const { message } = error.details[0];
    req.flash('status', message);
    return res.redirect('/login');
  }

  const admin = db
    .get('users')
    .find({ isAdmin: true })
    .value();

  if (email === admin.email && password === admin.password) {
    return res.redirect('/admin');
  }

  req.flash('status', `You are not an admin!`);
  res.redirect('/login');
};

module.exports = {
  get,
  post,
};