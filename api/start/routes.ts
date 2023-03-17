import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //Auth
  Route.post('auth/register', 'AuthController.register')
  Route.post('auth/login', 'AuthController.login')
  //Posts
  Route.resource('posts', 'PostsController')
    .apiOnly()
    .middleware({ store: 'auth', update: 'auth', destroy: 'auth' })
  //Replies
  Route.resource('posts.replies', 'RepliesController')
    .only(['store', 'destroy'])
    .middleware({ store: 'auth', destroy: 'auth' })
  //Likes
  Route.group(() => {
    Route.post('likes', 'LikesController.store')
    Route.delete('likes', 'LikesController.destroy')
    Route.get('likes', 'LikesController.show')
  })
    .prefix('posts/:post_id')
    .middleware('auth')
}).prefix('api')
