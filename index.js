require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
const cors = require('cors')
const { connectToMongoDB } = require("./connection");
const { authenticateToken } = require("./middlewares/auth");

connectToMongoDB(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(authenticateToken)

const categoryRoutes = require("./routes/category");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require('./routes/customer')
const transactionRoutes = require('./routes/transaction')
const settingsRoutes = require('./routes/settings')

app.use("/",categoryRoutes);
app.use("/",inventoryRoutes);
app.use("/",customerRoutes)
app.use("/",transactionRoutes)
app.use("/",settingsRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
