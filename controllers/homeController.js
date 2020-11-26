const Tender = require("../models/Tender")
const Bidder = require("../models/User")
const Manager = require("../models/Manager")

exports.getHome = async (req, res) => {
    const allBidders = await Bidder.find();
    const allManagers = await Manager.find();
    const allTenders = await Tender.find();
    const tendersLength = allTenders.length;
    const biddersLength = await allBidders.length;
    const managersLength = await allManagers.length;
    // const certificatesLength = allCertificates.length;
    res.render("dashboard", {
        // //user accessed after login
        name: req.user.username,
        tendersNumber: tendersLength,
        biddersNumber: biddersLength,
        managersNumber: managersLength
    });
}