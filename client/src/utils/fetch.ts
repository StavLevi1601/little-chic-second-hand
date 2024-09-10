import axios from "axios";
import { ItemSchema } from "../validations/itemSchema";

export const fetch = async (data: ItemSchema) => {
  try {
    console.log("Data:", data);

    const token = localStorage.getItem("token"); // קבלת הטוקן מה-LocalStorage
    console.log(`${import.meta.env.VITE_BACKEND_URL}items`);

    data.price = parseInt(data.price.toString());
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}items`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(result);

    return result;
  } catch (e) {
    console.error("Error adding item:", e);
    throw e;
  }
};

export const fetchGetItem = async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}items`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (e) {
    console.error("Error getting items:", e);
    throw e;
  }
};

export const fetchCollection = async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}items/images`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
