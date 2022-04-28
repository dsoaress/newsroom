import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PreviewMode } from '../../shared/decorators/preview-mode.decorator'
import { Public } from '../../shared/decorators/public-route.decorator'
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
  findAll(@PreviewMode() previewMode?: boolean) {
    return this.newsService.findAll(previewMode)
  }

  @Public()
  @Query(() => News, { name: 'news' })
  findOne(
    @Args('slug', { type: () => String }) slug: string,
    @PreviewMode() previewMode?: boolean
  ) {
    return this.newsService.findOne({ slug, previewMode })
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
