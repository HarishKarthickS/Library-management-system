-- 📌 Get Books That Have Never Been Borrowed
SELECT 
    b.book_name, 
    b.book_publisher
FROM book b
LEFT JOIN issuance i ON b.book_id = i.book_id
WHERE i.book_id IS NULL;

-- 📌 Get Outstanding Books (Not Yet Returned)
SELECT 
    m.mem_name AS Member, 
    b.book_name AS Book, 
    i.issuance_date, 
    i.target_return_date, 
    b.book_publisher AS Publisher
FROM issuance i
JOIN book b ON i.book_id = b.book_id
JOIN member m ON i.issuance_member = m.mem_id
WHERE i.issuance_status = 'pending';

-- 📌 Get Top 10 Most Borrowed Books
SELECT 
    b.book_name, 
    COUNT(i.book_id) AS times_borrowed, 
    COUNT(DISTINCT i.issuance_member) AS members_borrowed
FROM issuance i
JOIN book b ON i.book_id = b.book_id
GROUP BY b.book_id
ORDER BY times_borrowed DESC
LIMIT 10;
