import 'dotenv/config'

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { UploadClient } from '@uploadcare/upload-client'
import { hashSync } from 'bcrypt'
import { getPlaiceholder } from 'plaiceholder'
import slugify from 'slugify'

const prisma = new PrismaClient()

export async function getCategoryData() {
  const categoryName = faker.lorem.sentence(faker.datatype.number({ min: 1, max: 2 })).slice(0, -1)
  const categorySlug = slugify(categoryName, { lower: true })

  const newsOneTitle = faker.lorem.sentence().slice(0, -1)
  const newsOneSlug = slugify(newsOneTitle, { lower: true })

  const newsTwoTitle = faker.lorem.sentence().slice(0, -1)
  const newsTwoSlug = slugify(newsTwoTitle, { lower: true })

  const categorySlugExists = await prisma.category.findUnique({
    where: { slug: categorySlug }
  })

  const newsOneSlugExists = await prisma.news.findUnique({
    where: { slug: newsOneSlug }
  })

  const newsTwoSlugExists = await prisma.news.findUnique({
    where: { slug: newsTwoSlug }
  })

  if (categorySlugExists || newsOneSlugExists || newsTwoSlugExists) return null

  return {
    categoryName,
    categorySlug,
    newsOneTitle,
    newsOneSlug,
    newsTwoTitle,
    newsTwoSlug
  }
}

export async function getImage() {
  console.log('Uploading image...')

  const uploadClient = new UploadClient({
    publicKey: process.env.UPLOADCARE_PUBLIC_KEY
  })

  const image = faker.image.abstract(4000, 2000)
  const { base64: blurDataUrl } = await getPlaiceholder(image, { size: 10 })
  const { cdnUrl: url } = await uploadClient.uploadFile(image)

  return {
    blurDataUrl,
    url
  }
}

async function main() {
  const usersCount = await prisma.user.count()
  const categoriesCount = await prisma.category.count()

  if (usersCount < 1) {
    await prisma.user.createMany({
      data: [
        {
          name: 'Jane Doe',
          email: 'admin@admin.com',
          password: hashSync('12345678', 10),
          role: 'ADMIN'
        },
        {
          name: 'John Doe',
          email: 'user@user.com',
          password: hashSync('12345678', 10)
        }
      ]
    })
  }

  if (categoriesCount < 1) {
    for (let i = 1; i <= 12; i++) {
      const { categoryName, categorySlug, newsOneSlug, newsOneTitle, newsTwoSlug, newsTwoTitle } =
        await getCategoryData()

      console.log(`${i}/${12}`)
      console.log(`Creating category ${categorySlug}...`)

      await prisma.category.create({
        data: {
          name: categoryName,
          description: faker.lorem.sentence(),
          slug: categorySlug,
          news: {
            create: [
              {
                title: newsOneTitle,
                description: faker.lorem.sentence(),
                slug: newsOneSlug,
                date: faker.date.past(),
                published: faker.datatype.boolean(),
                body: faker.lorem.paragraphs(15),
                image: {
                  create: await getImage()
                }
              },
              {
                title: newsTwoTitle,
                description: faker.lorem.sentence(),
                slug: newsTwoSlug,
                date: faker.date.past(),
                published: faker.datatype.boolean(),
                body: faker.lorem.paragraphs(15),
                image: {
                  create: await getImage()
                }
              }
            ]
          }
        }
      })
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
