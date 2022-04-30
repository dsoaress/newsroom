import { GraphQLClient } from 'graphql-request'
import { RequestInit } from 'graphql-request/dist/types.dom'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers)
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Category = {
  __typename?: 'Category'
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  news: Array<News>
  slug: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type CreateCategoryInput = {
  description: Scalars['String']
  name: Scalars['String']
  slug: Scalars['String']
}

export type CreateNewsInput = {
  body: Scalars['String']
  categoryId: Scalars['String']
  date: Scalars['DateTime']
  description: Scalars['String']
  imageId?: InputMaybe<Scalars['String']>
  published?: InputMaybe<Scalars['Boolean']>
  slug: Scalars['String']
  title: Scalars['String']
}

export type CreateSessionInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type CreateUserInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  role?: InputMaybe<Scalars['String']>
}

export type Image = {
  __typename?: 'Image'
  blurDataUrl: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  url: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createCategory: Category
  createImage: Image
  createNews: News
  createSession: Session
  createUser: User
  removeCategory: Category
  removeImage: Image
  removeNews: News
  removeUser: User
  updateCategory: Category
  updateNews: News
  updateSession: Session
  updateUser: User
}

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput
}

export type MutationCreateImageArgs = {
  file: Scalars['Upload']
}

export type MutationCreateNewsArgs = {
  createNewsInput: CreateNewsInput
}

export type MutationCreateSessionArgs = {
  createSessionInput: CreateSessionInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationRemoveCategoryArgs = {
  id: Scalars['String']
}

export type MutationRemoveImageArgs = {
  id: Scalars['String']
}

export type MutationRemoveNewsArgs = {
  id: Scalars['String']
}

export type MutationRemoveUserArgs = {
  id: Scalars['String']
}

export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput
}

export type MutationUpdateNewsArgs = {
  updateNewsInput: UpdateNewsInput
}

export type MutationUpdateSessionArgs = {
  refreshToken: Scalars['String']
}

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput
}

export type News = {
  __typename?: 'News'
  body: Scalars['String']
  category: Category
  createdAt: Scalars['DateTime']
  date: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['ID']
  image?: Maybe<Image>
  published: Scalars['Boolean']
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  allNews: Array<News>
  categories: Array<Category>
  category: Category
  image: Image
  images: Array<Image>
  news: News
  profile: User
  user?: Maybe<User>
  users: Array<User>
}

export type QueryAllNewsArgs = {
  preview?: InputMaybe<Scalars['Boolean']>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type QueryCategoriesArgs = {
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type QueryCategoryArgs = {
  slug: Scalars['String']
}

export type QueryImageArgs = {
  id: Scalars['String']
}

export type QueryNewsArgs = {
  preview?: InputMaybe<Scalars['Boolean']>
  slug: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export enum Role {
  Admin = 'ADMIN',
  Editor = 'EDITOR'
}

export type Session = {
  __typename?: 'Session'
  accessToken: Scalars['String']
  refreshToken: Scalars['String']
  user: User
}

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

export type UpdateNewsInput = {
  body?: InputMaybe<Scalars['String']>
  categoryId?: InputMaybe<Scalars['String']>
  date?: InputMaybe<Scalars['DateTime']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  imageId?: InputMaybe<Scalars['String']>
  published?: InputMaybe<Scalars['Boolean']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  name?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  role?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  role: Role
  updatedAt: Scalars['DateTime']
}

export type CreateNewsMutationVariables = Exact<{
  createNewsInput: CreateNewsInput
}>

export type CreateNewsMutation = {
  __typename?: 'Mutation'
  createNews: {
    __typename?: 'News'
    id: string
    title: string
    description: string
    slug: string
    date: any
    published: boolean
    body: string
    image?: { __typename?: 'Image'; url: string; blurDataUrl: string } | null
    category: { __typename?: 'Category'; name: string; slug: string }
  }
}

export type CreateSessionMutationVariables = Exact<{
  createSessionInput: CreateSessionInput
}>

export type CreateSessionMutation = {
  __typename?: 'Mutation'
  createSession: {
    __typename?: 'Session'
    accessToken: string
    refreshToken: string
    user: { __typename?: 'User'; id: string; name: string; email: string; role: Role }
  }
}

export type GetAllCategoriesQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}>

export type GetAllCategoriesQuery = {
  __typename?: 'Query'
  categories: Array<{
    __typename?: 'Category'
    id: string
    name: string
    description: string
    slug: string
  }>
}

export type GetAllNewsQueryVariables = Exact<{
  preview?: InputMaybe<Scalars['Boolean']>
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}>

export type GetAllNewsQuery = {
  __typename?: 'Query'
  allNews: Array<{
    __typename?: 'News'
    id: string
    title: string
    slug: string
    date: any
    published: boolean
    image?: { __typename?: 'Image'; url: string; blurDataUrl: string } | null
    category: { __typename?: 'Category'; name: string; slug: string }
  }>
}

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllUsersQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; id: string; name: string; email: string; role: Role }>
}

export type GetCategoryBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type GetCategoryBySlugQuery = {
  __typename?: 'Query'
  category: {
    __typename?: 'Category'
    id: string
    name: string
    description: string
    slug: string
    news: Array<{
      __typename?: 'News'
      id: string
      title: string
      slug: string
      date: any
      published: boolean
      image?: { __typename?: 'Image'; url: string; blurDataUrl: string } | null
    }>
  }
}

export type GetNewsBySlugQueryVariables = Exact<{
  preview?: InputMaybe<Scalars['Boolean']>
  slug: Scalars['String']
}>

export type GetNewsBySlugQuery = {
  __typename?: 'Query'
  news: {
    __typename?: 'News'
    id: string
    title: string
    slug: string
    date: any
    published: boolean
    body: string
    image?: { __typename?: 'Image'; url: string; blurDataUrl: string } | null
    category: { __typename?: 'Category'; name: string; slug: string }
  }
}

export type GetProfileQueryVariables = Exact<{ [key: string]: never }>

export type GetProfileQuery = {
  __typename?: 'Query'
  profile: { __typename?: 'User'; id: string; name: string; email: string; role: Role }
}

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetUserByIdQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; id: string; name: string; email: string; role: Role } | null
}

export const CreateNewsDocument = `
    mutation CreateNews($createNewsInput: CreateNewsInput!) {
  createNews(createNewsInput: $createNewsInput) {
    id
    title
    description
    image {
      url
      blurDataUrl
    }
    slug
    category {
      name
      slug
    }
    date
    published
    body
  }
}
    `
export const useCreateNewsMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<CreateNewsMutation, TError, CreateNewsMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<CreateNewsMutation, TError, CreateNewsMutationVariables, TContext>(
    ['CreateNews'],
    (variables?: CreateNewsMutationVariables) =>
      fetcher<CreateNewsMutation, CreateNewsMutationVariables>(
        client,
        CreateNewsDocument,
        variables,
        headers
      )(),
    options
  )
export const CreateSessionDocument = `
    mutation CreateSession($createSessionInput: CreateSessionInput!) {
  createSession(createSessionInput: $createSessionInput) {
    user {
      id
      name
      email
      role
    }
    accessToken
    refreshToken
  }
}
    `
export const useCreateSessionMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateSessionMutation,
    TError,
    CreateSessionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>(
    ['CreateSession'],
    (variables?: CreateSessionMutationVariables) =>
      fetcher<CreateSessionMutation, CreateSessionMutationVariables>(
        client,
        CreateSessionDocument,
        variables,
        headers
      )(),
    options
  )
export const GetAllCategoriesDocument = `
    query GetAllCategories($take: Int, $skip: Int, $search: String) {
  categories(take: $take, skip: $skip, search: $search) {
    id
    name
    description
    slug
  }
}
    `
export const useGetAllCategoriesQuery = <TData = GetAllCategoriesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetAllCategoriesQueryVariables,
  options?: UseQueryOptions<GetAllCategoriesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetAllCategoriesQuery, TError, TData>(
    variables === undefined ? ['GetAllCategories'] : ['GetAllCategories', variables],
    fetcher<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(
      client,
      GetAllCategoriesDocument,
      variables,
      headers
    ),
    options
  )
export const GetAllNewsDocument = `
    query GetAllNews($preview: Boolean, $take: Int, $skip: Int, $search: String) {
  allNews(preview: $preview, take: $take, skip: $skip, search: $search) {
    id
    title
    image {
      url
      blurDataUrl
    }
    slug
    category {
      name
      slug
    }
    date
    published
  }
}
    `
export const useGetAllNewsQuery = <TData = GetAllNewsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetAllNewsQueryVariables,
  options?: UseQueryOptions<GetAllNewsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetAllNewsQuery, TError, TData>(
    variables === undefined ? ['GetAllNews'] : ['GetAllNews', variables],
    fetcher<GetAllNewsQuery, GetAllNewsQueryVariables>(
      client,
      GetAllNewsDocument,
      variables,
      headers
    ),
    options
  )
export const GetAllUsersDocument = `
    query GetAllUsers {
  users {
    id
    name
    email
    role
  }
}
    `
export const useGetAllUsersQuery = <TData = GetAllUsersQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetAllUsersQueryVariables,
  options?: UseQueryOptions<GetAllUsersQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetAllUsersQuery, TError, TData>(
    variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables],
    fetcher<GetAllUsersQuery, GetAllUsersQueryVariables>(
      client,
      GetAllUsersDocument,
      variables,
      headers
    ),
    options
  )
export const GetCategoryBySlugDocument = `
    query GetCategoryBySlug($slug: String!) {
  category(slug: $slug) {
    id
    name
    description
    slug
    news {
      id
      title
      image {
        url
        blurDataUrl
      }
      slug
      date
      published
    }
  }
}
    `
export const useGetCategoryBySlugQuery = <TData = GetCategoryBySlugQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetCategoryBySlugQueryVariables,
  options?: UseQueryOptions<GetCategoryBySlugQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetCategoryBySlugQuery, TError, TData>(
    ['GetCategoryBySlug', variables],
    fetcher<GetCategoryBySlugQuery, GetCategoryBySlugQueryVariables>(
      client,
      GetCategoryBySlugDocument,
      variables,
      headers
    ),
    options
  )
export const GetNewsBySlugDocument = `
    query GetNewsBySlug($preview: Boolean, $slug: String!) {
  news(preview: $preview, slug: $slug) {
    id
    title
    image {
      url
      blurDataUrl
    }
    slug
    category {
      name
      slug
    }
    date
    published
    body
  }
}
    `
export const useGetNewsBySlugQuery = <TData = GetNewsBySlugQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetNewsBySlugQueryVariables,
  options?: UseQueryOptions<GetNewsBySlugQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetNewsBySlugQuery, TError, TData>(
    ['GetNewsBySlug', variables],
    fetcher<GetNewsBySlugQuery, GetNewsBySlugQueryVariables>(
      client,
      GetNewsBySlugDocument,
      variables,
      headers
    ),
    options
  )
export const GetProfileDocument = `
    query GetProfile {
  profile {
    id
    name
    email
    role
  }
}
    `
export const useGetProfileQuery = <TData = GetProfileQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetProfileQueryVariables,
  options?: UseQueryOptions<GetProfileQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetProfileQuery, TError, TData>(
    variables === undefined ? ['GetProfile'] : ['GetProfile', variables],
    fetcher<GetProfileQuery, GetProfileQueryVariables>(
      client,
      GetProfileDocument,
      variables,
      headers
    ),
    options
  )
export const GetUserByIdDocument = `
    query GetUserById($id: String!) {
  user(id: $id) {
    id
    name
    email
    role
  }
}
    `
export const useGetUserByIdQuery = <TData = GetUserByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetUserByIdQueryVariables,
  options?: UseQueryOptions<GetUserByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserByIdQuery, TError, TData>(
    ['GetUserById', variables],
    fetcher<GetUserByIdQuery, GetUserByIdQueryVariables>(
      client,
      GetUserByIdDocument,
      variables,
      headers
    ),
    options
  )
