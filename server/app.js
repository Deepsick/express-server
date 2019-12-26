const { join } = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const routesPath = join(__dirname, 'routes');
const adminRoutes = require(join(routesPath, 'admin'));
const indexRoutes = require(join(routesPath, 'index'));
const loginRoutes = require(join(routesPath, 'login'));

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views', 'pages'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('asdqwefreby'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
