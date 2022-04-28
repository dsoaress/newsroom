import { News } from './News'

export type AllNews = Omit<News, 'body'>[]
