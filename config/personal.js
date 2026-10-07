const mssv = process.env.MSSV;

module.exports = {
  mssv,
  hoTen: process.env.HO_TEN,
  prefix: mssv.slice(-3),                  
  vat: Number(mssv.slice(-1)) + 6,         
};