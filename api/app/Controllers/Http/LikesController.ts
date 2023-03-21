import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like'
import Post from 'App/Models/Post'
import { DateTime } from 'luxon'

export default class LikesController {
  public async store({ auth, params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.post_id)
    const existingLike = await Like.query()
      .where('post_id', post.id)
      .where('user_id', auth.user!.id)
      .first()

    if (existingLike) {
      return response.status(400).json({
        error: 'User has already liked this post',
      })
    } else {
      const like = await post.related('likes').create({ userId: auth.user?.id })
      post.updatedAt = DateTime.now()
      await post.save()
      await like?.load('user')
      await like?.load('post')
      return response.ok({ data: like })
    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.post_id)
    const like = await post.related('likes').query().where('user_id', auth.user!.id).first()
    if (!like) {
      return response.notFound("You haven't liked this post yet")
    }
    await like.delete()
    return response.noContent()
  }

  public async show({ params, auth, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.post_id)
    const like = await post.related('likes').query().where('user_id', auth.user!.id).first()
    if (!like) {
      return response.notFound("You haven't liked this post yet")
    } else {
      await like?.load('user')
      await like?.load('post')
      response.ok({ data: like })
    }
  }
}
