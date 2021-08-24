/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/new").post(controller.create);

module.exports = router;
