require('dotenv').config();
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const personal = require('./config/personal');

const app = express();

// Bắt buộc khi chạy sau proxy của Render (để cookie secure hoạt động)
app.set('trust proxy', 1);

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Session lưu tập trung trên MongoDB Atlas (stateless)
app.use(require('./config/session'));
app.use((req, res, next) => {
  req.session.views = (req.session.views || 0) + 1;
  res.locals.visits = req.session.views;
  next();
});

// Dữ liệu cá nhân hóa cho footer
app.use((req, res, next) => {
  res.locals.hoTen = personal.hoTen;
  res.locals.mssv = personal.mssv;
  res.locals.vat = personal.vat;
  next();
});

// Routes
app.use('/', require('./routes/books'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server chạy tại cổng ${PORT}`));