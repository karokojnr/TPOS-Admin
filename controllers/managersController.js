const Manager = require("../models/Manager")
const Bidder = require("../models/User")
const Tender = require("../models/Tender")

exports.getManagers = async (req, res) => {
    const allManagers = await Manager.find();
    const allBidders = await Bidder.find();
    const allTenders = await Tender.find();
    const tendersLength = allTenders.length;
    const biddersLength = await allBidders.length;
    const managersLength = await allManagers.length;
    Manager.find({}).then(managers => {
        res.render("managers", {
            name: req.user.username,
            managers: managers,
            managersLength: managers.length,
            tendersNumber: tendersLength,
            biddersNumber: biddersLength,
            managersNumber: managersLength
        })

    }).catch(err => {
        console.log(err);
    });
}
exports.activateManager = (req, res) => {
    const managerId = req.params.id;
    Manager.findById(managerId)
        .then((manager) => {
            if (manager.isManager === "YES") {
                req.flash("error_msg", "The Manager is already activated.");
                res.redirect("/managers");
            }
            manager.isManager = "YES";
            manager.save().then((updatedManager) => {
                req.flash("success_msg", "Success! Manager activated.");
                res.redirect("/managers");
            });
        })
        .catch((e) => {
            console.log(e.message);
        });
};
exports.deactivateManager = (req, res) => {
    const managerId = req.params.id;
    Manager.findById(managerId)
        .then((manager) => {
            if (manager.isManager === "NO") {
                req.flash("error_msg", "The Manager is already deactivated.");
                res.redirect("/managers");
            }
            manager.isManager = "NO";

            manager.save().then((updatedManager) => {
                req.flash("success_msg", "Success! Manager deactivated.");
                res.redirect("/managers");
            });
        })
        .catch((e) => {
            console.log(e.message);
        });
};