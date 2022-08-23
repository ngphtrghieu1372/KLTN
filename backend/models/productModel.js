import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    brand: { type: String},
    category: { type: String },
    countInStock: { type: Number },
    description: { type: String },
    image: { type: String, required: true},
    numReviews: { type: Number },
    price: { type: Number },
    rating: { type: Number },
    reviews: [reviewSchema]
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
