import express from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Items } from "../Models/items.js";
import { itemSchema } from "../validations/items.js";
import { v4 as uuidv4 } from "uuid";
import { getAllCollectionImages } from "../aws/s3.js";

const router = express.Router();

router.get("/images", async (req, res) => {
  try {
    const imageUrlsPromises = getAllCollectionImages();

    const imageUrls = await Promise.all(imageUrlsPromises);

    return res.json({
      success: true,
      data: imageUrls,
    });
  } catch (error) {
    console.error("Error in fetching images:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch images",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Items.find({});
    console.log("data", data);

    res.json({
      success: true,
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const data = req.body;
    data.status = "available";

    const validateData = itemSchema.safeParse(data);
    if (!validateData.success) {
      return res.status(400).json({
        message: validateData.error.message,
        status: false,
      });
    }

    console.log("Validated data:", validateData.data);

    const itemId = uuidv4();
    const itemData = { ...validateData.data, itemId };
    const item = new Items(itemData);

    await item.save();

    return res.json({
      success: true,
      item,
    });
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({
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
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

router.put("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const data = req.body;
    const validateData = itemSchema.safeParse(data);
    if (!validateData.success) {
      return res.status(400).json({
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
    return res.status(500).json({
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
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
