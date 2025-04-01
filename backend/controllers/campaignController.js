const Campaign = require("../models/Campaign");

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ status: { $ne: "DELETED" } });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign || campaign.status === "DELETED") {
            return res.status(404).json({ error: "Campaign not found" });
        }
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCampaign = async (req, res) => {
    console.log(req.body);
    try {
        const { name, description, status, leads, accountIDs } = req.body;  // Destructuring

        if (!name || !description || !status) {
            return res.status(400).json({ error: 'Name, Description, and Status are required fields.' });
        }

        const newCampaign = new Campaign({
            name,
            description,
            status,
            leads,
            accountIDs,
        });

        await newCampaign.save();

        res.status(201).json(newCampaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const { name, description, status, leads, accountIDs } = req.body;
        const updatedCampaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            { name, description, status, leads, accountIDs },
            { new: true }
        );
        if (!updatedCampaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }
        res.json(updatedCampaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const deletedCampaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            { status: "DELETED" },
            { new: true }
        );
        if (!deletedCampaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }
        res.json({ message: "Campaign deleted (soft delete applied)" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
