require('dotenv').config();
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
app.set('trust proxy', 1);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// ===== [SESSION] =====



// ===== [DATABASE] =====



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));