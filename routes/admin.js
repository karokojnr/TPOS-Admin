const express = require("express");
const app = express();

const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController")
const bidderController = require("../controllers/biddersContoller")
const managerController = require("../controllers/managersController")
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


app.get("/", ensureAuthenticated, homeController.getHome);
// app.get("/add-tender", ensureAuthenticated, tenderController.getAddTender)
app.get("/get-login", forwardAuthenticated, adminController.getLogin)
app.get("/get-register", forwardAuthenticated, adminController.getRegister)
app.get("/logout", adminController.getLogout);
// app.get("/tenders", ensureAuthenticated, tenderController.getTenders)
app.get("/bidders", ensureAuthenticated, bidderController.getBidders)
app.get("/managers", ensureAuthenticated, managerController.getManagers)
app.post("/login", adminController.postLogin)
app.post("/register", adminController.registerAdmin)
app.put("/activate-bidder/:id", ensureAuthenticated, bidderController.activateBidder);
app.put("/deactivate-bidder/:id", ensureAuthenticated, bidderController.deactivateBidder);
app.put("/activate-manager/:id", ensureAuthenticated, managerController.activateManager);
app.put("/deactivate-manager/:id", ensureAuthenticated, managerController.deactivateManager);
module.exports = app;
