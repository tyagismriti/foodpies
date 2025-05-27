const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const env = require('dotenv');
env.config();

const receipeRoutes = require("./routes/recipeRoutes");
const postRoutes = require("./routes/postRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("foodipes server is running successfully!");
});

app.use("/api/books", bookRoutes);
app.use("/api/recipes_data", receipeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected To Database!'))
  .catch((err) => console.error(err.message));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
