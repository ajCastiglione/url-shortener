const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to the DB
connectDB();

app.use(express.json({ extended: false }));

// Define routes
app.use("/", require("./routes/index"));
app.use("/url", require("./routes/url"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
