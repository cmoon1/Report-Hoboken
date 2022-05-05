const express = require("express");
const router = express.Router();
const data = require("../data");
const reportData = data.reports;

router.get("/", async (req, res) => {
	try {
		let reportArr = await reportData.getAll();
		res.status(200).json(reportArr);
	} catch (e) {
		res.status(404).json(e);
	}
});

router.post("/filter", async (req, res) => {
	let issueInfo = req.body;
	if (!issueInfo.issueType) {
		res.status(400).json({ error: "Issue type needs to be provided" });
		return;
	}
	try {
		let reportArr = await reportData.getFilteredIssues(issueInfo.issueType);
		res.status(200).json(reportArr);
	} catch (e) {
		res.status(404).json(e);
	}
});

router.post("/", async (req, res) => {
	let reportInfo = req.body;
	if (!reportInfo) {
		res.status(400).json({ error: "Data needs to be provided!" });
		return;
	}
	let formData = reportInfo.formData;

	if (
		!formData.name ||
		!formData.date ||
		!reportInfo.address ||
		!formData.issueType ||
		!formData.description ||
		!formData.email
	) {
		res.status(400).json({ error: "Not all data is provided!" });
		return;
	}

	if (
		typeof formData.name !== "string" ||
		typeof formData.date !== "string" ||
		typeof reportInfo.address !== "string" ||
		typeof formData.issueType !== "string" ||
		typeof formData.description !== "string" ||
		typeof formData.email !== "string"
	) {
		res.status(400).json({ error: "Data given is not of proper type!" });
		return;
	}

	try {
		const newReport = await reportData.createReport(
			formData.name,
			formData.date,
			reportInfo.address,
			formData.issueType,
			formData.description,
			formData.email
		);
		res.status(200).json(newReport);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

module.exports = router;
