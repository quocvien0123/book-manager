const mongoose = require('mongoose');

// Tắt tạo index/collection tự động vì user đọc/ghi không có quyền đó
const opts = {
	autoIndex: false,
	autoCreate: false,
	dbName: process.env.MONGO_DB_NAME,
};

const readConn = mongoose.createConnection(process.env.MONGO_URI_READ, opts);
const writeConn = mongoose.createConnection(process.env.MONGO_URI_WRITE, opts);

readConn.on('connected', () => console.log('✔ Kết nối READ OK'));
writeConn.on('connected', () => console.log('✔ Kết nối WRITE OK'));
readConn.on('error', (e) => console.error('READ lỗi:', e.message));
writeConn.on('error', (e) => console.error('WRITE lỗi:', e.message));

module.exports = { readConn, writeConn };