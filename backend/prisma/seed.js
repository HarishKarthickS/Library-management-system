const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  // Create 50 members
  const members = await Promise.all(
    Array.from({ length: 50 }, () => 
      prisma.member.create({
        data: {
          mem_name: faker.person.fullName(),
          mem_phone: faker.phone.number(),
          mem_email: faker.internet.email(),
          membership: {
            create: {
              status: faker.helpers.arrayElement(['Active', 'Expired'])
            }
          }
        }
      })
    )
  );

  // Create collections
  const collections = await Promise.all(
    ['Fiction', 'Non-Fiction', 'Reference', 'Periodicals', 'Children'].map(name =>
      prisma.collection.create({ data: { collection_name: name } })
    )
  );

  // Create categories
  const categories = await Promise.all([
    { name: 'Science Fiction', sub: 'Space Opera' },
    { name: 'History', sub: 'Ancient Civilizations' },
    { name: 'Technology', sub: 'Programming' },
    { name: 'Mathematics', sub: 'Calculus' },
    { name: 'Literature', sub: 'Classic Novels' },
    { name: 'Art', sub: 'Modern Art' },
    { name: 'Science', sub: 'Biology' },
    { name: 'Business', sub: 'Management' },
    { name: 'Self-Help', sub: 'Motivational' },
    { name: 'Cooking', sub: 'Baking' }
  ].map(cat => 
    prisma.category.create({
      data: {
        cat_name: cat.name,
        sub_cat_name: cat.sub
      }
    })
  ));

  // Create 100 books
  const books = await Promise.all(
    Array.from({ length: 100 }, () =>
      prisma.book.create({
        data: {
          book_name: `${faker.commerce.productAdjective()} ${faker.word.noun()}`,
          book_launch_date: faker.date.between({ from: '2010-01-01', to: new Date() }),
          book_publisher: faker.company.name(),
          book_cat_id: categories[Math.floor(Math.random() * categories.length)].cat_id,
          book_collection_id: collections[Math.floor(Math.random() * collections.length)].collection_id
        }
      })
    )
  );

  // Create 100 random issuances
  const issuances = await Promise.all(
    Array.from({ length: 100 }, () => {
      const randomBook = books[Math.floor(Math.random() * books.length)];
      const randomMember = members[Math.floor(Math.random() * members.length)];
      const issuanceDate = faker.date.between({ from: '2022-01-01', to: new Date() });
      const targetDate = new Date(issuanceDate);
      targetDate.setDate(targetDate.getDate() + 14);

      return prisma.issuance.create({
        data: {
          issuance_date: issuanceDate,
          issued_by: faker.person.fullName(),
          target_return_date: targetDate,
          issuance_status: faker.helpers.arrayElement(['returned', 'pending']),
          book: { connect: { book_id: randomBook.book_id } },
          member: { connect: { mem_id: randomMember.mem_id } }
        }
      });
    })
  );

  console.log(`Seed completed:
  - ${members.length} members
  - ${collections.length} collections (${collections.map(c => c.collection_name).join(', ')})
  - ${categories.length} categories
  - ${books.length} books
  - ${issuances.length} random issuances`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());