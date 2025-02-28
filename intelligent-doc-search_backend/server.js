const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const documentRoutes = require("./documentRoutes");
const authRoutes = require("./authRoutes");
const db = require("./db");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use("/api", documentRoutes);

app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
