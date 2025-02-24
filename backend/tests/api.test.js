const { PrismaClient } = require('@prisma/client');
const request = require('supertest');
const app = require('../index');
require('dotenv').config(); // Load environment variables

const prisma = new PrismaClient();
const HEADERS = { 
  'Content-Type': 'application/json',
  'x-api-key': process.env.API_KEY // API key from environment
};

let createdCategoryId;
let createdCollectionId;
let createdBookId;
let createdMemberId;

beforeAll(async () => {
  // Verify API key is set
  if (!process.env.API_KEY) {
    throw new Error('API_KEY environment variable is not set');
  }

  // Fetch existing seeded data
  const category = await prisma.category.findFirst();
  createdCategoryId = category.cat_id;

  const collection = await prisma.collection.findFirst();
  createdCollectionId = collection.collection_id;

  const book = await prisma.book.findFirst();
  createdBookId = book.book_id;

  const member = await prisma.member.findFirst();
  createdMemberId = member.mem_id;
});

describe('📌 Library Management System API Tests', () => {
  it('should fetch all members', async () => {
    const res = await request(app)
      .get('/member')
      .set(HEADERS);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new member', async () => {
    const newMember = { 
      member_name: 'John Doe', 
      member_email: 'john.doe@example.com' 
    };
    
    const res = await request(app)
      .post('/member')
      .set(HEADERS)
      .send(newMember);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.member_name).toBe(newMember.member_name);
  });

  it('should update an existing member', async () => {
    const res = await request(app)
      .put(`/member/${createdMemberId}`)
      .set(HEADERS)
      .send({
        member_name: 'Updated Member Name',
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.member_name).toBe('Updated Member Name');
  });

  it('should fetch all books', async () => {
    const res = await request(app)
      .get('/book')
      .set(HEADERS);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new book', async () => {
    const newBook = {
      book_name: 'New Test Book',
      book_cat_id: createdCategoryId,
      book_collection_id: createdCollectionId,
      book_launch_date: '2024-02-22',
      book_publisher: 'Test Publisher',
    };

    const res = await request(app)
      .post('/book')
      .set(HEADERS)
      .send(newBook);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.book_name).toBe(newBook.book_name);
  });

  it('should fetch all issuance records', async () => {
    const res = await request(app)
      .get('/issuance')
      .set(HEADERS);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create an issuance record', async () => {
    const newIssuance = {
      book_id: createdBookId,
      issuance_member: createdMemberId,
      issued_by: 'Librarian A',
      target_return_date: '2024-03-01',
      issuance_status: 'pending',
    };

    const res = await request(app)
      .post('/issuance')
      .set(HEADERS)
      .send(newIssuance);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.issued_by).toBe(newIssuance.issued_by);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  app.close(); // Properly close the server
});