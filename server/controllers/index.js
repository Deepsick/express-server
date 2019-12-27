const { join } = require('path');

const db = require(join(__dirname, '..', 'db'));

const validatorPath = join(__dirname, '..', 'validators', 'index');
const indexValidator = require(validatorPath);

const get = (req, res, next) => {
  const message = req.flash('status')[0];

  res.render('index', {
    msgsemail: message,
  });
};


const post = (req, res, next) => {
  const { name, email, message } = req.body;

  const { error } = indexValidator.validate({ name, email, message });

  if (!error) {
    db
      .get('messages')
      .push({
        name,
        email,
        message
      })
      .write();

      req.flash('status', 'Message was accepted!');
  } else {
    const { message } = error.details[0];
    req.flash('status', message);
  }
  
  res.redirect('/');
};

module.exports = {
  get,
  post,
};