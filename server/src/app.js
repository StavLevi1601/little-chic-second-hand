import express from "express";
import usersRouter from "./routes/users.routes.js";
import itemsRouter from "./routes/items.routes.js";
import authRouter from "./routes/auth.routes.js";
import authenticateToken from "./middleware/auth.js";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
const port = 3000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DETAILS}.pvpztpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working");
});

app.use(cors());

app.use("/auth", authRouter);
app.use("/users", authenticateToken, usersRouter);

app.use("/items", authenticateToken, itemsRouter);

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`);
});
