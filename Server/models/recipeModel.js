const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  author: {
    type: String,
    require: true,
  },
  keywords: {
    type: [String],
    default: []
  },
}, { timestamps: true });

const RecipeModel = mongoose.model('recipe', recipeSchema);

module.exports = RecipeModel;