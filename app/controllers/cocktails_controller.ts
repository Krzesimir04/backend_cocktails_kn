import type { HttpContext } from '@adonisjs/core/http'
import Cocktail from '#models/cocktail'

export default class CocktailsController {
    async getCocktailAndIngredients(cocktail:any){
        const ingredients = await cocktail.related('ingredients_cocktails').query().pivotColumns(['quantity'])
        const data = ingredients.map((ing:any)=>{
            return{
                ingredient:ing.$attributes,
                quantity: ing.$extras.pivot_quantity
            }
        })
        return {
            ingredients: data,
            cocktail: cocktail?.toJSON()}
    }
    async create({request, response}:HttpContext){
        try{
            const cocktail = new Cocktail
            cocktail.name = String(request.body().name)
            cocktail.instructions = String(request.body().instructions)
            cocktail.isAlcohol = Boolean(request.body().isAlcohol)
            console.log(request.body())
            console.log(request.input('imageUrl'))
            cocktail.imageUrl = String(request.body().imageUrl || null)
            cocktail.categoryId = Number(request.body().categoryId)
            await cocktail.save()

            const ingredientIds = request.body().ingredients.trim().split(',').map((item:any) => {
                const [id, quantity] = item.split(':').map(Number)
                return { id, quantity }
                })
            let ingredientData: { id: number; quantity: number }[] = []
            ingredientData = ingredientIds
            const ingredientMap: Record<number, { quantity: number }> = {}
            ingredientData.forEach((ing) => {
                ingredientMap[ing.id] = { quantity: ing.quantity }
            })
            if(ingredientIds && ingredientIds.length > 0) {
                await cocktail.related('ingredients_cocktails').attach(ingredientMap)
            }
            if(request.qs()?.ingredients === "1"){
                return await this.getCocktailAndIngredients(cocktail)
            }
            return response.ok(cocktail.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async delete({params, response}:HttpContext){
        try{
            const cocktail = await Cocktail.find(params.id)
            if(cocktail){
                cocktail.related('ingredients_cocktails').detach()
                await cocktail?.delete()
                return response.ok({'message':"success"})
            }
            return {"message": "Cocktail does not exists."}
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async get({params,request, response}:HttpContext){
        try{
            const cocktail = await Cocktail.find(params.id)
            if(request.qs()?.ingredients === "1"){
                return response.ok(await this.getCocktailAndIngredients(cocktail))
            }
            return response.ok(cocktail?.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async get_all({request,response}:HttpContext){
        try{
            const cocktails = await Cocktail.all()
            if(request.qs()?.ingredients === "1"){
                const cocktailsWithIngredients = await Promise.all(cocktails.map(async(cocktail)=>{
                    return await this.getCocktailAndIngredients(cocktail)
                }))
                return response.ok(cocktailsWithIngredients)
            }
            return response.ok(cocktails)
        }catch(error){
            return {message:'Unexpected error', error: error.message}
        }
    }
    async update({params, request, response}:HttpContext){
        try{
            const cocktail = await Cocktail.find(params.id)
            if(cocktail){
                cocktail.name = request.body().name || cocktail.name
                cocktail.instructions = String(request.body().instructions) || cocktail.instructions
                cocktail.isAlcohol = request.body().isAlcohol === undefined ? cocktail.isAlcohol : Boolean(Number(request.body().isAlcohol))
                cocktail.imageUrl = String(request.body().imageUrl)|| cocktail.imageUrl
                cocktail?.save()
                const ingredientIds = request.body().ingredients.trim().split(',').map((item:any) => {
                    const [id, quantity] = item.split(':').map(Number)
                    return { id, quantity }
                    })

                let ingredientData: { id: number; quantity: number }[] = []
                ingredientData = ingredientIds

                const ingredientMap: Record<number, { quantity: number }> = {}
                ingredientData.forEach((ing) => {
                    ingredientMap[ing.id] = { quantity: ing.quantity }
                })
                if(ingredientIds && ingredientIds.length > 0) {
                    await cocktail.related('ingredients_cocktails').sync(ingredientMap)
                }
                if(request.qs()?.ingredients === "1"){
                    return response.ok(await this.getCocktailAndIngredients(cocktail))
                }
                return response.ok(cocktail.toJSON())
            }
            else{
                return {'message':'The cocktail does not exists.'}
            }
        }catch(error){
            return {message:'Unexpected error', error: error.message}
        }
        }
}