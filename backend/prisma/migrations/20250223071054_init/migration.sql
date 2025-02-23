-- CreateTable
CREATE TABLE "Member" (
    "mem_id" SERIAL NOT NULL,
    "mem_name" TEXT NOT NULL,
    "mem_phone" TEXT NOT NULL,
    "mem_email" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("mem_id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "membership_id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("membership_id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "collection_id" SERIAL NOT NULL,
    "collection_name" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "cat_id" SERIAL NOT NULL,
    "cat_name" TEXT NOT NULL,
    "sub_cat_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("cat_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "book_id" SERIAL NOT NULL,
    "book_name" TEXT NOT NULL,
    "book_launch_date" TIMESTAMP(3) NOT NULL,
    "book_publisher" TEXT NOT NULL,
    "book_cat_id" INTEGER NOT NULL,
    "book_collection_id" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "Issuance" (
    "issuance_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "issuance_date" TIMESTAMP(3) NOT NULL,
    "issuance_member" INTEGER NOT NULL,
    "issued_by" TEXT NOT NULL,
    "target_return_date" TIMESTAMP(3) NOT NULL,
    "issuance_status" TEXT NOT NULL,

    CONSTRAINT "Issuance_pkey" PRIMARY KEY ("issuance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_member_id_key" ON "Membership"("member_id");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("mem_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_cat_id_fkey" FOREIGN KEY ("book_cat_id") REFERENCES "Category"("cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_collection_id_fkey" FOREIGN KEY ("book_collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_issuance_member_fkey" FOREIGN KEY ("issuance_member") REFERENCES "Member"("mem_id") ON DELETE RESTRICT ON UPDATE CASCADE;
