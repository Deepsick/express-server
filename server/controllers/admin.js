const { join } = require('path');

const db = require(join(__dirname, '..', 'db'));

const get = (req, res, next) => {
  const productMessage = req.flash('productStatus')[0];
  const skillsMessage = req.flash('SkillsStatus')[0];

  res.render('admin', {
    msgfile: productMessage,
    msgskill: skillsMessage,
  });
};


const postProduct = (req, res, next) => {
  const picture = req.file;
  const { name, price } = req.body;

  db
    .get('products')
    .push({
      name,
      price,
      picture: picture.path,
    })
    .write();
  
  req.flash('productStatus', 'Product was added!');
  res.redirect('/admin');
};

const postSkills = (req, res, next) => {
  const { age, concerts, cities, years } = req.body;

  db
    .get('skills')
    .push({
      age,
      concerts,
      cities,
      years,
    })
    .write();
  
  req.flash('SkillsStatus', 'Skills were added!');
  res.redirect('/admin');
};


module.exports = {
  get,
  postProduct,
  postSkills,
};