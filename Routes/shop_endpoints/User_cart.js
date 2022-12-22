const router = require("express").Router();
const {
  AddUserCartProducts,
  GetUserCartProducts,
  DeleteUserCartProduct,
  EditingUserCartProduct,
  GetProducts,
  GetProductById,
  PostUserAddress,
  GetUserAddress,
  DeleteUserAddress,
  EditingUserAddress,
} = require("../../Controllers/shop_controllers/user_cart.controller");

router.post("/addcart_products", AddUserCartProducts);
router.get("/getmy_cartproducts/:id", GetUserCartProducts);
router.delete("/deletemy_product/:id", DeleteUserCartProduct);
router.patch("/editingmy_product", EditingUserCartProduct);

//cart
router.get("/getProducts", GetProducts);
router.get("/getProductById/:id", GetProductById);
// Address
router.post("/add_address", PostUserAddress);
router.get("/user_address/:id", GetUserAddress);
router.delete("/delete_address/:id", DeleteUserAddress);
router.patch("/editing_user_ddress", EditingUserAddress);
// EditingUserAddress
module.exports = router;
