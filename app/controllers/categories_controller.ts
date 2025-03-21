import type { HttpContext } from '@adonisjs/core/http'

import Category from "#models/category";


export default class CategoriesController {
    async create({request,response}:HttpContext){
        try{
            const category = new Category
            category.name = String(request.only(['name']).name)
            category.save()
            return response.ok(category.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async delete({params, response}:HttpContext){
        try{
            const category = await Category.find(params.id)
            await category?.delete()
            return response.ok({'message':"success"})
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async get({params,response}:HttpContext){
        try{
            const category = await Category.find(params.id)
            return response.ok(category?.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async get_all({response}:HttpContext){
        try{
            const categories = await Category.all()
            return response.ok(categories)
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
    async update({params, request,response}:HttpContext){
        try{
            const category = await Category.find(params.id)
            category.name = request.only(['name']).name
            category?.save()
            return response.ok(category?.toJSON())
        }catch(error){
            return{message:'Unexpected error', error: error.message}
        }
    }
}