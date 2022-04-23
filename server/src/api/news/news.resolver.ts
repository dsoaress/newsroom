import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateNewsInput } from './dto/create-news.input'
import { UpdateNewsInput } from './dto/update-news.input'
import { News } from './entities/news.entity'
import { NewsService } from './news.service'

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Mutation(() => News)
  createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
    return this.newsService.create(createNewsInput)
  }

  @Query(() => [News], { name: 'news' })
  findAll() {
    return this.newsService.findAll()
  }

  @Query(() => News, { name: 'news' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findOne(id)
  }

  @Mutation(() => News)
  updateNews(@Args('updateNewsInput') updateNewsInput: UpdateNewsInput) {
    return this.newsService.update(updateNewsInput.id, updateNewsInput)
  }

  @Mutation(() => News)
  removeNews(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.remove(id)
  }
}
