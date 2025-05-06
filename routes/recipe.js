import express from 'express';
import { add, getAllRecipe, getRecipeByCategory, getRecipeById, getRecipeByUserId, getSavedRecipe, SavedRecipeById } from '../controllers/recipe.js';
import { Authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Create recipe
router.post('/add', Authenticate, add);

// Get all recipes
router.get('/', getAllRecipe);

// Get all saved recipes
router.get('/saved', getSavedRecipe);

// Get recipe by ID
router.get('/:id', getRecipeById);

// Get recipes by User ID
router.get('/user/:id', getRecipeByUserId);

// Get recipe by category
router.get('/category/:category', getRecipeByCategory);

// Save Recipe by ID
router.post('/:id', Authenticate, SavedRecipeById);

export default router;
