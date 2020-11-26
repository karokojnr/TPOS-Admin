const Bidder = require("../models/User")
const Manager = require("../models/Manager")
const Tender = require("../models/Tender")


exports.getBidders = async (req, res) => {
    const allBidders = await Bidder.find();
    const allManagers = await Manager.find();
    const allTenders = await Tender.find();
    const tendersLength = allTenders.length;
    const biddersLength = await allBidders.length;
    const managersLength = await allManagers.length;
    Bidder.find({}).then(bidders => {
        res.render("bidders", {
            name: req.user.username,
            bidders: bidders,
            biddersLength: bidders.length,
            tendersNumber: tendersLength,
            biddersNumber: biddersLength,
            managersNumber: managersLength
        })

    }).catch(err => {
        console.log(err);
    });
}
exports.activateBidder = (req, res) => {
    const bidderId = req.params.id;
    Bidder.findById(bidderId)
        .then((bidder) => {
            if (bidder.isUser === "YES") {
                req.flash("error_msg", "The Bidder is already activated.");
                res.redirect("/bidders");
            }
            bidder.isUser = "YES";
            bidder.save().then((updatedBidder) => {
                req.flash("success_msg", "Success! Bidder activated.");
                res.redirect("/bidders");
            });
        })
        .catch((e) => {
            console.log(e.message);
        });
};
exports.deactivateBidder = (req, res) => {
    const bidderId = req.params.id;
    Bidder.findById(bidderId)
        .then((bidders) => {
            if (bidders.isUser === "NO") {
                req.flash("error_msg", "The Bidder is already deactivated.");
                res.redirect("/bidders");
            }
            bidder.isUser = "NO";

            bidder.save().then((updatedBidder) => {
                req.flash("success_msg", "Success! Bidder deactivated.");
                res.redirect("/bidders");
            });
        })
        .catch((e) => {
            console.log(e.message);
        });
};