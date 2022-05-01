const express = require("express");
const router = express.Router();
const data = require('../data');
const reportData = data.reports;

router.get ("/", async (req, res) => {
    try {
        let reportArr = await reportData.getAll();
        res.status(200).json(reportArr);
    } catch(e) {
        res.status(404).json(e);
    }
});

router.post("/", async (req, res) => {
    let reportInfo = req.body;

    if(!reportInfo) {
        res.status(400).json({error: "Data needs to be provided!"});
        return;
    }

    if(!reportInfo.name || !reportInfo.date || !reportInfo.address || !reportInfo.issueType || !reportInfo.description) {
        res.status(400).json({error: "Not all data is provided!"});
        return;
    }

    if(typeof reportInfo.name !== 'string' || typeof reportInfo.date !== 'string' || typeof reportInfo.address !== 'string' || 
        typeof reportInfo.issueType !== 'string' || typeof reportInfo.description !== 'string') {
        res.status(400).json({error: "Data given is not of proper type!"});
        return;
    }

    try {
        const newReport = await reportData.createReport(
            reportInfo.name,
            reportInfo.date,
            reportInfo.address,
            reportInfo.issueType,
            reportInfo.description
        );
        res.status(200).json(newReport);
    } catch(e) {
        res.status(404).json(e);
    }
});

module.exports = router;
