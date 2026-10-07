const session = require('express-session');
const { MongoStore } = require('connect-mongo');

module.exports = session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_WRITE,  
    dbName: process.env.MONGO_DB_NAME,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24 * 7,                 
    autoRemove: 'disabled',                 
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});