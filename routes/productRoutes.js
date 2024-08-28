const express = require("express");
const Product = require("../models/productModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const app = express();

// Create Product
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    // const product = new Product({
    //   name,
    //   price,
    //   description,
    //   user: req.user.userId,
    // });
    // await product.save();

    const data = await Product.create({
      name,
      price,
      description,
      user: req.user.userId,
    });
    console.log(data);

    res.status(201).json({ message: "Product created successfully", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Products
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Products for the Authenticated User
router.get("/", authMiddleware, async (req, res) => {
  console.log(req.user, "aaa");
  try {
    // Fetch products only for the logged-in user
    const products = await Product.find({ user: req.user.userId }).populate(
      "user",
      "name email"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ _id: id });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
