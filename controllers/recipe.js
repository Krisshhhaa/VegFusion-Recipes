import { Recipe } from '../Models/Recipe.js';
import { SavedRecipe } from '../Models/SavedRecipe.js';

export const add = async (req, res) => {
    const { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl, category } = req.body;

    try {
        const recipe = await Recipe.create({
            title,
            ist,
            ing1,
            ing2,
            ing3,
            ing4,
            qty1,
            qty2,
            qty3,
            qty4,
            imgurl,
            category,  
            user: req.user,
        });

        res.json({ message: "Recipe Created Successfully..!", recipe });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getAllRecipe = async (req, res) => {
    const recipe = await Recipe.find();
    res.json({ recipe });
};

export const getRecipeById = async (req, res) => {
    const id = req.params.id;

    try {
        let recipe = await Recipe.findById(id);
        if (!recipe) return res.json({ message: 'Recipe not found' });

        res.json({ message: "Recipe by ID", recipe });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getRecipeByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        let recipe = await Recipe.find({ user: userId });
        if (!recipe) return res.json({ message: 'Recipe not found' });

        res.json({ message: "Recipe by User ID", recipe });
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const getRecipeByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        const recipes = await Recipe.find({ category });
        if (recipes.length === 0) return res.json({ message: "No recipes found for this category" });

        res.json({ message: `Recipes for category: ${category}`, recipes });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const SavedRecipeById = async (req, res) => {
    const id = req.params.id;

    let recipe = await SavedRecipe.findOne({ recipe: id });

    if (recipe) return res.json({ message: "Recipe Already Saved" });

    recipe = await SavedRecipe.create({ recipe: id });

    res.json({ message: "Recipe Saved Successfully..!" });
};

export const getSavedRecipe = async (req, res) => {
    const recipe = await SavedRecipe.find();
    res.json({ recipe });
};
