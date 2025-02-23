require('dotenv').config();
const request = require('supertest');
const app = require('../index'); // Import the Express app

const API_KEY = process.env.API_KEY;
const HEADERS = { 'x-api-key': API_KEY };

describe('📌 Library Management System API Tests', () => {

  // ✅ Test GET /member
  it('should fetch all members', async () => {
    const res = await request(app).get('/member').set(HEADERS);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ Test POST /member
  it('should create a new member', async () => {
    const newMember = {
      mem_name: 'Test User',
      mem_phone: '1234567890',
      mem_email: 'test@example.com'
    };
    const res = await request(app).post('/member').set(HEADERS).send(newMember);
    expect(res.statusCode).toBe(201);
    expect(res.body.mem_name).toBe(newMember.mem_name);
  });

  // ✅ Test PUT /member/:id
  it('should update an existing member', async () => {
    const updatedMember = { mem_name: 'Updated Name' };
    const res = await request(app).put('/member/1').set(HEADERS).send(updatedMember);
    expect(res.statusCode).toBe(200);
    expect(res.body.mem_name).toBe(updatedMember.mem_name);
  });

  // ✅ Test GET /book
  it('should fetch all books', async () => {
    const res = await request(app).get('/book').set(HEADERS);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ Test POST /book
  it('should create a new book', async () => {
    const newBook = {
      book_name: 'Test Book',
      book_cat_id: 1,
      book_collection_id: 1,
      book_launch_date: '2024-02-22',
      book_publisher: 'Test Publisher'
    };
    const res = await request(app).post('/book').set(HEADERS).send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body.book_name).toBe(newBook.book_name);
  });

  // ✅ Test GET /issuance
  it('should fetch all issuance records', async () => {
    const res = await request(app).get('/issuance').set(HEADERS);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ Test POST /issuance
  it('should create an issuance record', async () => {
    const newIssuance = {
      book_id: 1,
      issuance_member: 1,
      issued_by: 'Librarian A',
      target_return_date: '2024-03-01',
      issuance_status: 'pending'
    };
    const res = await request(app).post('/issuance').set(HEADERS).send(newIssuance);
    expect(res.statusCode).toBe(201);
    expect(res.body.issued_by).toBe(newIssuance.issued_by);
  });

  // ✅ Test GET /reports/never-borrowed
  it('should fetch books that were never borrowed', async () => {
    const res = await request(app).get('/reports/never-borrowed').set(HEADERS);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ Test GET /reports/outstanding-books
  it('should fetch outstanding books', async () => {
    const res = await request(app).get('/reports/outstanding-books').set(HEADERS);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ Test GET /reports/top-borrowed-books
  it('should fetch top 10 most borrowed books', async () => {
    const res = await request(app).get('/reports/top-borrowed-books').set(HEADERS);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
