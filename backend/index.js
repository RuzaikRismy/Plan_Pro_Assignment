const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/groupManagmentRoutes");
const user = require("./routes/userRoutes");
const group = require("./routes/groupManagmentRoutes");
const event = require("./routes/eventRoutes");


var cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.urlencoded({limit: '25mb'}));;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3002' }));

connectDB();

app.use(express.json());

app.use("/api", user);
app.use("/api", group);
app.use("/api", event);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
