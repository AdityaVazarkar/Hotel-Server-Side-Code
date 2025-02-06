const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

// Get All Menu
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    console.log("menu fetch successful");
    res.status(200).send(menu);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// Post Menu Item
router.post("/", async (req, res) => {
  try {
    const menu = req.body;
    const menuItem = new MenuItem(menu);
    const response = await menuItem.save();

    console.log("Menu saved");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error saving menu");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "Sweet" || taste == "Spicy" || taste == "Sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("Taste data fetched");
      res.status(200).json({ response });
    } else {
      res.status(404).json({ err: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuItem = req.body;
    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItem,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ err: "MenuItem not found" });
    }
    console.log("MenuItem Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(404).json({ err: "MenuItem not found" });
    }
    console.log("MenuItem deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
