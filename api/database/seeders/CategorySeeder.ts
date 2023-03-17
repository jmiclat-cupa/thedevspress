import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      { name: 'General' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Vue JS' },
      { name: 'Nuxt' },
      { name: 'Adonis JS' },
      { name: 'Git' },
    ])
  }
}
