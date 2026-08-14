const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

// Get all hospitals
router.get("/", async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.status(200).json(hospitals);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Get hospitals with available beds
router.get("/available", async (req, res) => {
    try {
        const hospitals = await Hospital.find({
            availableBeds: { $gt: 0 }
        });

        res.status(200).json(hospitals);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Get hospital by ID
router.get("/:id", async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found"
            });
        }

        res.status(200).json(hospital);

    } catch (error) {
        res.status(400).json({
            message: "Invalid hospital ID"
        });
    }
});

// Add hospital
router.post("/", async (req, res) => {
    try {
        const { name, city, totalBeds, availableBeds } = req.body;

        if (!name || !city || totalBeds == null || availableBeds == null) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hospital = new Hospital({
            name,
            city,
            totalBeds,
            availableBeds
        });

        await hospital.save();

        res.status(201).json({
            message: "Hospital created successfully",
            hospital
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Update hospital
router.put("/:id", async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            message: "Hospital updated successfully",
            hospital
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid hospital ID or data"
        });
    }
});

// Delete hospital
router.delete("/:id", async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);

        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            message: "Hospital deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid hospital ID"
        });
    }
});

module.exports = router;