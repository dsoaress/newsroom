import 'dotenv/config'

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { UploadClient } from '@uploadcare/upload-client'
import { hashSync } from 'bcrypt'
import { getPlaiceholder } from 'plaiceholder'

const prisma = new PrismaClient()

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
    for (let i = 1; i <= 40; i++) {
      const categorySlug = faker.internet.domainWord()
      const newsSlug = faker.internet.domainWord()

      const categorySlugExists = await prisma.category.findUnique({
        where: { slug: categorySlug }
      })

      const newsSlugExists = await prisma.news.findUnique({
        where: { slug: newsSlug }
      })

      if (categorySlugExists || newsSlugExists) return null

      console.log(`${i}/${40}`)
      console.log(`Creating category ${categorySlug}...`)
      console.log(`Creating news ${newsSlug}...`)

      await prisma.category.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          slug: categorySlug,
          news: {
            create: [
              {
                title: faker.lorem.sentence(),
                description: faker.lorem.sentence(),
                slug: newsSlug,
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
