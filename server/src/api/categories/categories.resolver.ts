import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Public } from '../../shared/decorators/public-route.decorator'
import { CategoriesService } from './categories.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { Category } from './entities/category.entity'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput)
  }

  @Public()
  @Query(() => [Category], { name: 'categories' })
  findAll(
    @Args('search', { nullable: true }) search: string,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('take', { type: () => Int, nullable: true }) take: number
  ) {
    return this.categoriesService.findAll({ skip, take, search })
  }

  @Public()
  @Query(() => Category, { name: 'category' })
  findOne(@Args('slug', { type: () => String }) slug: string) {
    return this.categoriesService.findOne(slug)
  }

  @Mutation(() => Category)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput)
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoriesService.remove(id)
  }
}
