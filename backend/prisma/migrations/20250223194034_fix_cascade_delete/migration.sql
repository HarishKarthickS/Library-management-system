-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_issuance_member_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_member_id_fkey";

-- AlterTable
ALTER TABLE "Issuance" ALTER COLUMN "target_return_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("mem_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_cat_id_fkey" FOREIGN KEY ("book_cat_id") REFERENCES "Category"("cat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_collection_id_fkey" FOREIGN KEY ("book_collection_id") REFERENCES "Collection"("collection_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_issuance_member_fkey" FOREIGN KEY ("issuance_member") REFERENCES "Member"("mem_id") ON DELETE CASCADE ON UPDATE CASCADE;
