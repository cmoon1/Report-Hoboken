const reportRoute = require("./report");
const constructorMethod = (app) => {
	app.use("/report", reportRoute);
	app.use("*", (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;
