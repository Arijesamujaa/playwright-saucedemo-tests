import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('GET a single post returns 200 and the right id', async ({ request }) => {
    const response = await request.get(`${API}/posts/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
  });

  test('GET all posts returns 100 items', async ({ request }) => {
    const response = await request.get(`${API}/posts`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveLength(100);
  });

  test('POST creates a post and returns 201', async ({ request }) => {
    const response = await request.post(`${API}/posts`, {
      data: { title: 'QA test', body: 'created by Playwright', userId: 1 },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('QA test');
  });

  test('GET a non-existent post returns 404', async ({ request }) => {
    const response = await request.get(`${API}/posts/9999`);
    expect(response.status()).toBe(404);
  });
});