import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../shared/decorators/current-user.decorator'
import { Public } from '../../shared/decorators/public-route.decorator'
import { User } from '../users/entities/user.entity'
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

  @Public()
  @Query(() => [News], { name: 'allNews' })
  findAll(
    @Args('preview', { type: () => Boolean, nullable: true }) preview?: boolean,
    @CurrentUser() currentUser?: User
  ) {
    return this.newsService.findAll({ userId: currentUser?.id, preview })
  }

  @Public()
  @Query(() => News, { name: 'news' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Args('preview', { type: () => Boolean, nullable: true }) preview?: boolean,
    @CurrentUser() currentUser?: User
  ) {
    return this.newsService.findOne({ id, userId: currentUser?.id, preview })
  }

  @Mutation(() => News)
  updateNews(@Args('updateNewsInput') updateNewsInput: UpdateNewsInput) {
    return this.newsService.update(updateNewsInput.id, updateNewsInput)
  }

  @Mutation(() => News)
  removeNews(@Args('id', { type: () => String }) id: string) {
    return this.newsService.remove(id)
  }
}
