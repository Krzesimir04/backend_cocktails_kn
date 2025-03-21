import Ingredient from '#models/ingredient'
import type { HttpContext } from '@adonisjs/core/http'

export default class IngredientsController {
    async create({request,response}:HttpContext){
        try{
            const ingredient = new Ingredient
            ingredient.name = String(request.body().name)
            ingredient.description = String(request.body().description)
            ingredient.isAlcohol = Boolean(Number(request.body().isAlcohol))
            console.log(request.body())
            ingredient.imageUrl = String(request.body().imageUrl)
            ingredient.save()
            return response.ok(ingredient.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async delete({params, response}:HttpContext){
        try{
            const ingredient = await Ingredient.find(params.id)
            if(ingredient){
                ingredient.related('ingredients_cocktails').detach()
                await ingredient.delete()
                return response.ok({'message':"success"})
            }

        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async get({params, response}:HttpContext){
        try{
            const ingredient = await Ingredient.find(params.id)
            return response.ok(ingredient.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async get_all({response}:HttpContext){
        try{
            const ingredients = await Ingredient.all()
            return response.ok(ingredients)
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async update({params, request,response}:HttpContext){
        try{
            const ingredient = await Ingredient.find(params.id)
            if(ingredient){
                ingredient.name = request.body().name || ingredient.name
                ingredient.description = String(request.body().description) || ingredient.description
                ingredient.isAlcohol = request.body().isAlcohol === undefined ? ingredient.isAlcohol : Boolean(Number(request.body().isAlcohol))
                ingredient.imageUrl = String(request.body().imageUrl)|| ingredient.imageUrl
                ingredient?.save()
                return response.ok(ingredient.toJSON())
            }
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
}