import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

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
  findAll(
    @Args('preview', { nullable: true }) preview?: boolean,
    @Args('search', { nullable: true }) search?: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @PreviewMode() previewMode?: boolean
  ) {
    return this.newsService.findAll({ previewMode: preview && previewMode, skip, take, search })
  }

  @Public()
  @Query(() => News, { name: 'news' })
  findOne(
    @Args('slug', { type: () => String }) slug: string,
    @Args('preview', { nullable: true }) preview?: boolean,
    @PreviewMode() previewMode?: boolean
  ) {
    return this.newsService.findOne({ slug, previewMode: preview && previewMode })
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
