const mssv = process.env.MSSV;

module.exports = {
  mssv,
  hoTen: process.env.HO_TEN,
  prefix: mssv.slice(-3),                  // 3 số cuối MSSV
  vat: Number(mssv.slice(-1)) + 6,         // (chữ số cuối + 6)%
};