const { join } = require('path');

const db = require(join(__dirname, '..', 'db'));

const validatorPath = join(__dirname, '..', 'validators', 'admin');
const adminValidator = require(validatorPath);

const get = (req, res, next) => {
  const productMessage = req.flash('productStatus')[0];
  const skillsMessage = req.flash('SkillsStatus')[0];

  res.render('admin', {
    msgfile: productMessage,
    msgskill: skillsMessage,
  });
};


const postProduct = (req, res, next) => {
  const { destination, originalname } = req.file;
  const { name, price } = req.body;

  const { error } = adminValidator.productSchema.validate({ name, price });

  if (!error) {
    db
      .get('products')
      .push({
        name,
        price,
        picture: destination + originalname.toLowerCase(),
      })
      .write();
    
    req.flash('productStatus', 'Product was added!');
  } else {
    const { message } = error.details[0];
    req.flash('productStatus', message);
  }

  res.redirect('/admin');
};

const postSkills = (req, res, next) => {
  const { age, concerts, cities, years } = req.body;
  
  const { error } = adminValidator.skillsSchema.validate({ age, concerts, cities, years });

  if (!error) {
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
  } else {
    const { message } = error.details[0];
    req.flash('SkillsStatus', message);
  }

  res.redirect('/admin');
};


module.exports = {
  get,
  postProduct,
  postSkills,
};