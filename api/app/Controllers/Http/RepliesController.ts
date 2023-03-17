import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import Post from 'App/Models/Post'
import ReplyValidator from 'App/Validators/ReplyValidator'

export default class RepliesController {
  public async store({ request, params, auth, response }: HttpContextContract) {
    const { content } = await request.validate(ReplyValidator)
    const post = await Post.findOrFail(params.post_id)
    const reply = await post.related('replies').create({ userId: auth.user?.id, content })
    await reply?.load('user')
    await reply?.load('post')
    return response.ok({ data: reply })
  }
  public async destroy({ auth, params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.post_id)
    const reply = await post.related('replies').query().where('id', params.id).firstOrFail()
    const poster = post.userId
    // return auth.user?.id + ' | ' + reply.userId + ' | ' + poster
    if (reply.userId === auth.user?.id || poster === auth.user?.id) {
      await reply.delete()
      return response.noContent()
    } else throw new UnauthorizedException('You are not authorized to delete this reply.')
  }
}
