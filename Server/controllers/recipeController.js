const fs = require("fs");
const RecipeModel = require("../models/recipeModel");

const getRecipes = async (req, res) => {
  try {
    const { query, filter } = req.query;
    const searchCriteria = {};

    if (query) {
      searchCriteria.title = { $regex: query, $options: 'i' };
    }

    if (filter && filter !== 'all') {
      searchCriteria.keywords = { $regex: filter, $options: 'i' };
    }
    
    const recipes = await RecipeModel.find(searchCriteria).lean();
    return res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in getting recipes.");
  }
};

const postRecipe = async (req, res) => {
  try {
    const { url, title, rating, author, description, keywords } = req.body;

    const book = await RecipeModel.create({ url, title, rating: Number(rating), author, description, keywords });
    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const postRecipesFromFile = async (req, res) => {
  try {
    fs.readFile(__dirname + "./../" + "recipes_data.json", "utf-8", async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Unable to read recipe list");
      }
      const recipes = JSON.parse(data);

      const recipesData = recipes.map((recipe) => {
        const { id, ...recipeData } = recipe;
        const rating = Number(recipe.rating);
        return { ...recipeData, rating };
      });

      const addedRecipes = await RecipeModel.insertMany(recipesData);

      return res.status(201).json({ message: `${addedRecipes.length} recipes added successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getRecipes, postRecipe, postRecipesFromFile };
