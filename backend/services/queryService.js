const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 🔹 Get Books Never Borrowed
 * Returns books that have never been issued
 */
const getNeverBorrowedBooks = async () => {
  return await prisma.$queryRaw`
    SELECT b.book_name, b.book_publisher
    FROM book b
    LEFT JOIN issuance i ON b.book_id = i.book_id
    WHERE i.book_id IS NULL;
  `;
};

/**
 * 🔹 Get Outstanding Books (Not Yet Returned)
 * Returns books that are issued but not yet returned
 */
const getOutstandingBooks = async () => {
  return await prisma.$queryRaw`
    SELECT m.mem_name AS Member, 
           b.book_name AS Book, 
           i.issuance_date, 
           i.target_return_date, 
           b.book_publisher AS Publisher
    FROM issuance i
    JOIN book b ON i.book_id = b.book_id
    JOIN member m ON i.issuance_member = m.mem_id
    WHERE i.issuance_status = 'pending';
  `;
};

/**
 * 🔹 Get Top 10 Most Borrowed Books
 * Returns the 10 books that have been borrowed the most
 */
const getTopBorrowedBooks = async () => {
  return await prisma.$queryRaw`
    SELECT b.book_name, 
           COUNT(i.book_id) AS times_borrowed, 
           COUNT(DISTINCT i.issuance_member) AS members_borrowed
    FROM issuance i
    JOIN book b ON i.book_id = b.book_id
    GROUP BY b.book_id
    ORDER BY times_borrowed DESC
    LIMIT 10;
  `;
};

module.exports = {
  getNeverBorrowedBooks,
  getOutstandingBooks,
  getTopBorrowedBooks,
};
