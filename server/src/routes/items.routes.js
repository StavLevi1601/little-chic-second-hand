import express from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Items } from "../Models/items.js";
import { itemSchema } from "../validations/items.js";
import { v4 as uuidv4 } from "uuid";
import { getAllCollectionImages } from "../aws/s3.js";
import { log } from "console";

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
    console.log("before the fund");
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
    console.log("datadatadata", data);
    const validateData = itemSchema.safeParse(data);
    console.log("validateData", validateData);
    if (!validateData.success) {
      return res.status(400).json({
        message: validateData.error.message,
        status: false,
      });
    }

    console.log("Validated data:", validateData.data);

    const itemId = uuidv4();
    const itemData = { ...validateData.data, id: itemId };
    console.log("itemData", itemData);
    const item = new Items(itemData);
    console.log("item", item);
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

router.get("/my-items/:userId", async (req, res) => {
  try {
    console.log("ffff");
    const { userId } = req.params;
    console.log("userId",req.params);
    const items = await Items.find({ seller_id: userId });
    console.log("itemsitems",items);
    return res.json({
      success: true,
      items,
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

router.delete("/", async (req, res) => {
  try {
    const itemsToDelete = req.body;
    console.log(":itemsToDelete", itemsToDelete);

    if (!Array.isArray(itemsToDelete) || itemsToDelete.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: expected non-empty array of items to delete",
      });
    }

    const deleteResult = await Items.deleteMany({
      _id: { $in: itemsToDelete.map(item => item._id) }
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found to delete",
      });
    }

    res.json({
      success: true,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
