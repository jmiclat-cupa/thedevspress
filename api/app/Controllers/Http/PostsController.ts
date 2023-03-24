import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import SortValidator from 'App/Validators/SortValidator'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

export default class PostsController {
  // Index post
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1) // Default page number.
    const perPage = request.input('per_page', 10) // Per page number of posts
    const userId = request.input('user_id') // Filtering by userID
    const categoryIds = request.input('category_id') // Filtering by category ID
    const categoryIdArray = categoryIds ? categoryIds.split(',') : []
    const search = request.input('search') // Search query
    const validatedData = await request.validate(SortValidator) //Sets a validator for Sorting
    const sortBy = validatedData.sort_by || 'updatedAt' //For sorting
    const order = validatedData.order || 'desc' //For sorting

    const posts = await Post.query()
      .if(userId, (query) => {
        // Filtering by userID
        query.where('user_id', userId)
      })
      .if(categoryIds, (query) => {
        // Filtering by category ID
        query.whereIn('category_id', categoryIdArray)
      })
      .if(search, (query) => {
        // Filtering by search query
        query.where('title', 'LIKE', `%${search}%`)
      })
      .withCount('likes')
      .orderBy(sortBy, order) //For sorting
      .preload('user')
      .preload('category')
      .preload('replies')
      .preload('likes')
      .paginate(page, perPage) //For Pagination
    return response.ok({ data: posts })
  }

  // Create post
  public async store({ request, auth, response }: HttpContextContract) {
    const validatedData = await request.validate(CreatePostValidator)
    const post = await auth.user?.related('posts').create(validatedData)
    await post?.load('user')
    await post?.load('category')

    return response.created({ data: post })
  }

  //Show single post
  public async show({ params, response }: HttpContextContract) {
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('category')
      .preload('replies')
      .preload('likes')
      .firstOrFail()
    return response.ok({ data: post })
  }

  // Update a post
  public async update({ request, auth, params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const validatedData = await request.validate(UpdatePostValidator)
    if (post.userId !== auth.user?.id) {
      throw new UnauthorizedException('You can only edit your own post.')
    }
    post.merge(validatedData)
    await post.save()
    await post?.load('user')
    await post?.load('category')

    return response.ok({ data: post })
  }

  // Delete a post
  public async destroy({ auth, params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    if (post.userId !== auth.user?.id) {
      throw new UnauthorizedException('You can only delete your own post.')
    }
    await post.delete()
    return response.ok({ data: 'Post deleted!' })
  }
}
