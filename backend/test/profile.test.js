// Basic test skeleton for profile routes
import request from 'supertest';
import app from '../index.js';

describe('Profile API', () => {
  it('GET /profile should return profile', async () => {
    const res = await request(app).get('/profile');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
  });
});
