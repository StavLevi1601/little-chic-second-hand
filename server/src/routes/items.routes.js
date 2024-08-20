import express from "express";
import { Items } from "../Models/items.js";
import { itemSchema } from "../validations/items.js";
import { uuid } from "uuidv4";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Items.find({});
    console.log("data", data);

    res.json({
      success: true,
      data: data,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body; // אין צורך ב-json()
    console.log(data);
    const validateData = itemSchema.safeParse(data);
    if (!validateData.success) {
      return res.status(500).json({
        message: validateData.error.message,
        status: false,
      });
    }

    const itemId = uuid();
    const itemData = { ...validateData.data, itemId };
    const item = new Items(itemData);
    await item.save();
    return res.json({
      success: true,
      item,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Items.findOne({ itemId });
    if (!item) {
      return res.status(404).json({
        message: "item not found",
        status: false,
      });
    }
    res.json({
      success: true,
      item,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.put("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const data = await req.body.json();
    const validateData = itemSchema.safeParse(data);
    if (!validateData.success) {
      return res.status(500).json({
        message: validateData.error.message,
        status: false,
      });
    }

    const item = await Items.findOneAndUpdate({ itemId }, validateData.data, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({
        message: "item not found",
        status: false,
      });
    }
    res.json({
      success: true,
      item,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Items.findOneAndDelete({ itemId });
    if (!item) {
      return res.status(404).json({
        message: "item not found",
        status: false,
      });
    }
    res.json({
      success: true,
      item,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

export default router;

//TODO: send a new generate id , adding redirect to a spesific item
