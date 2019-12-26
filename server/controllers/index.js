const { join } = require('path');

const db = require(join(__dirname, '..', 'db'));

const get = (req, res, next) => {
  const message = req.flash('status')[0];

  res.render('index', {
    msgsemail: message,
  });
};


const post = (req, res, next) => {
  const { name, email, message } = req.body;

  db
    .get('messages')
    .push({
      name,
      email,
      message
    })
    .write();
  
  req.flash('status', 'Message was accepted!');
  res.redirect('/');
};

module.exports = {
  get,
  post,
};