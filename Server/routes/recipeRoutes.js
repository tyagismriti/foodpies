const express = require("express");
const router = express.Router();

const { getRecipes, postRecipe, postRecipesFromFile } = require("../controllers/recipeController");

router.get("/", getRecipes);
router.post("/addRecipe", postRecipe);
router.post("/addRecipesFromFile", postRecipesFromFile);

module.exports = router;
