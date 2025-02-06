const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//get person data
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetch successful");
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Post person data
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data save");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// get work data
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "Chef" || workType == "Manager" || workType == "Waiter") {
      const response = await Person.find({ work: workType });
      console.log("Work data fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ err: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//update data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ err: "Person not found" });
    }
    console.log("Person data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error updating person" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ err: "Person not found" });
    }
    console.log("Person Delete Successfully");
    res.status(200).json({ err: "Person deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error deleting person" });
  }
});

module.exports = router;
