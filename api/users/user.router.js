const { createUser, createTax, login, getTaxpayers, deleteTaxpayer, updateTaxpayer } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser);
router.post("/createTaxpayer", checkToken, createTax);
router.get("/taxpayers",  checkToken, getTaxpayers);
router.get("/deleteTaxpayer", checkToken, deleteTaxpayer);
router.patch("/updateTaxpayer", checkToken, updateTaxpayer);
router.post("/login", login);
module.exports = router;

