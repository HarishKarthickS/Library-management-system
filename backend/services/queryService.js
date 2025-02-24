const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Helper function to convert BigInt values in an object or array
 * into Numbers so they can be serialized by JSON.stringify.
 */
function convertBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? Number(value) : value
    )
  );
}

/**
 * 🔹 Get Books Never Borrowed
 * Returns books that have never been issued.
 */
const getNeverBorrowedBooks = async () => {
  const result = await prisma.$queryRaw`
    SELECT b.book_name, b.book_publisher
    FROM "Book" b
    LEFT JOIN "Issuance" i ON b.book_id = i.book_id
    WHERE i.book_id IS NULL;
  `;
  return convertBigInt(result);
};

/**
 * 🔹 Get Outstanding Books (Not Yet Returned)
 * Returns books that are issued but not yet returned.
 */
const getOutstandingBooks = async () => {
  const result = await prisma.$queryRaw`
    SELECT m.mem_name AS Member, 
           b.book_name AS Book, 
           i.issuance_date, 
           i.target_return_date, 
           b.book_publisher AS Publisher
    FROM "Issuance" i
    JOIN "Book" b ON i.book_id = b.book_id
    JOIN "Member" m ON i.issuance_member = m.mem_id
    WHERE i.issuance_status = 'pending';
  `;
  return convertBigInt(result);
};

/**
 * 🔹 Get Top 10 Most Borrowed Books
 * Returns the 10 books that have been borrowed the most.
 */
const getTopBorrowedBooks = async () => {
  const result = await prisma.$queryRaw`
    SELECT b.book_name, 
           COUNT(i.book_id) AS times_borrowed, 
           COUNT(DISTINCT i.issuance_member) AS members_borrowed
    FROM "Issuance" i
    JOIN "Book" b ON i.book_id = b.book_id
    GROUP BY b.book_id
    ORDER BY times_borrowed DESC
    LIMIT 10;
  `;
  return convertBigInt(result);
};

module.exports = {
  getNeverBorrowedBooks,
  getOutstandingBooks,
  getTopBorrowedBooks,
};
