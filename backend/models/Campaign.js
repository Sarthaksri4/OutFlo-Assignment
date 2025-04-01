const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["ACTIVE", "INACTIVE", "DELETED"], default: "ACTIVE" },
    leads: { type: [String], default: [] },
    accountIDs: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Campaign", campaignSchema);
