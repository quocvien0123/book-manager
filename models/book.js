const mongoose = require('mongoose');
const { readConn, writeConn } = require('../config/db');

const bookSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    vat: { type: Number, required: true },
    priceAfterTax: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = {
  BookRead: readConn.model('Book', bookSchema, 'books'),   
  BookWrite: writeConn.model('Book', bookSchema, 'books'),  
};