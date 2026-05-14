require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// 🔥 DEBUG
console.log("MONGO_URL:", process.env.MONGO_URL);

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const contactRoute = require("./routes/contact");

const cors = require("cors");
const morgan = require("morgan");
const { accessLogStream } = require("./middlewares/morgan");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const upload = require("./middlewares/multer");
const cloudinary = require("./cloud uploads/cloudinary");
const fs = require("fs");

// ✅ FIXED: better MongoDB URI handling
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;

// ✅ FIXED: proper connection with options
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("MongoDB Error ❌:", err.message);
    process.exit(1);
  });

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Green Grocery",
      },
      servers: ["/"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("build"));
app.use(cors());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());

// Test route
app.get("/home", (req, res) => {
  res.json({ message: "running" });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/contact", contactRoute);
const razorpayRoute = require("./routes/razorpay");
app.use("/api/razorpay", razorpayRoute);

// Image upload
app.post("/upload-images", upload.array("image"), async (req, res) => {
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "Images");

    const urls = [];

    for (const file of req.files) {
      const newPath = await uploader(file.path);
      urls.push(newPath);
      fs.unlinkSync(file.path);
    }

    res.status(200).json({
      message: "Images Uploaded Successfully",
      data: urls,
    });
  } catch (err) {
    res.status(500).json({
      error: "Image upload failed",
    });
  }
});

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

module.exports = app;