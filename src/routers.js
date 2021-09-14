const express = require("express");
const router = express.Router();
const upload = require("./middleware/upload");
const authAdmin = require("./middleware/authAdmin");
const authClient = require("./middleware/authClient");
const HomeController = require("./controllers/HomeController");
const AdminController = require("./controllers/AdminController");
const AuthAdminController = require("./controllers/AuthAdminController");
const AuthClientController = require("./controllers/AuthClientController");
const ProductController = require("./controllers/ProductController");
const ClientController = require("./controllers/ClientController");
const OrderController = require("./controllers/OrderController");

router.post("/auth/admin", AuthAdminController.login);
router.post("/auth/client", AuthClientController.login);

router.get("/", HomeController.index);
router.get("/users", authAdmin, AdminController.getAllAdmins);
router.get("/users/:id", AdminController.getAdminById);
router.post("/users", AdminController.newAdmin);
router.patch("/users/:id", AdminController.edit);
router.delete("/users/:id", AdminController.remove);

router.get("/products", ProductController.index);
// prettier-ignore
router.post("/products", upload.single("path"), ProductController.newProduct);
router.get("/products/:id", ProductController.getProductById);
// prettier-ignore
router.patch("/products/:id", upload.single("path"), ProductController.edit);
router.delete("/products/:id", ProductController.remove);

router.get("/clients", ClientController.index);
router.post("/clients", ClientController.newClient);
router.get("/clients/:id", ClientController.getClientById);
router.patch("/clients/:id", ClientController.edit);
router.delete("/clients/:id", ClientController.remove);

router.get("/orders", OrderController.index);
router.post("/orders", OrderController.newOrder);
router.delete("/orders/:id", OrderController.remove);

module.exports = router;
