const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync( 'store.json');
const db = low(adapter);

if (!db.has('messages').value()) {
  db
    .defaults({
      messages: [],
      skills: [],
      products: [],
      users: [{
        email: 'admin@mail.ru',
        password: 'admin',
        isAdmin: true,
      }],
    })
    .write();
}

module.exports = db;