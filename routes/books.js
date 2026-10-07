const router = require('express').Router();
const { BookRead, BookWrite } = require('../models/book');
const { prefix, vat } = require('../config/personal');

async function renderHome(res, extra = {}, status = 200) {
  const books = await BookRead.find().sort({ createdAt: -1 }).lean(); // → user ĐỌC
  res.status(status).render('home', { books, prefix, vat, ...extra });
}

router.get('/books', async (req, res) => {
  try {
    await renderHome(res);
  } catch (e) {
    res.status(500).send('Lỗi đọc dữ liệu: ' + e.message);
  }
});

router.get('/', (req, res) => res.redirect('/books'));

router.post('/books', async (req, res) => {
  try {
    const code = (req.body.code || '').trim();
    const title = (req.body.title || '').trim();
    const author = (req.body.author || '').trim();
    const price = Number(req.body.price);

    // Bộ lọc mã sản phẩm: bắt buộc có tiền tố = 3 số cuối MSSV
    if (!code.startsWith(prefix)) {
      return renderHome(res, { error: `Mã sản phẩm phải bắt đầu bằng "${prefix}"`, form: req.body }, 400);
    }
    if (!title || !Number.isFinite(price) || price < 0) {
      return renderHome(res, { error: 'Dữ liệu không hợp lệ', form: req.body }, 400);
    }

    // Tính giá sau thuế TRƯỚC khi lưu
    const priceAfterTax = Math.round(price * (1 + vat / 100));

    await BookWrite.create({ code, title, author, price, vat, priceAfterTax }); // → user GHI
    res.redirect('/books');
  } catch (e) {
    res.status(500).send('Lỗi ghi dữ liệu: ' + e.message);
  }
});

module.exports = router;