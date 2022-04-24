import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const usersCount = await prisma.user.count()

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
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
