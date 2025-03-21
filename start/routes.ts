/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/categories_controller'
import IngredientsController from '#controllers/ingredients_controller'
import CocktailsController from '#controllers/cocktails_controller'
// import CategoriesController from '#controllers/CategoriesController'

router.on('/').render('pages/home')
// router.get('/cat', [CategoriesController, 'home'])

// router.on('/categories').render('pages/newcat')
router.get('/categories',[CategoriesController, 'get_all'])
router.post('/categories',[CategoriesController, 'create'])
router.delete('/categories/:id',[CategoriesController, 'delete'])
router.put('/categories/:id',[CategoriesController, 'update'])
router.get('/categories/:id',[CategoriesController, 'get'])
router.get('/ingredients',[IngredientsController, 'get_all'])
router.post('/ingredients',[IngredientsController, 'create'])
router.delete('/ingredients/:id',[IngredientsController, 'delete'])
router.put('/ingredients/:id',[IngredientsController, 'update'])
router.get('/ingredients/:id',[IngredientsController, 'get'])
router.get('/cocktails',[CocktailsController, 'get_all'])
router.post('/cocktails',[CocktailsController, 'create'])
router.delete('/cocktails/:id',[CocktailsController, 'delete'])
router.put('/cocktails/:id',[CocktailsController, 'update'])
router.get('/cocktails/:id',[CocktailsController, 'get'])