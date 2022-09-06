export default class ProductFixtures {
  static getProductList() {
    return [
      {
        id: 1,
        name: 'The Fullstack Hoodie',
        category: 'cat1',
        quantity: 10,
        price: 19.99,
        discount: 30,
        code: 'P-1',
        image: 'logo.png',
      },
      {
        id: 2,
        name: 'The Fullstack Tee',
        category: 'cat1',
        quantity: 10,
        price: 15.99,
        discount: 30,
        code: 'P-1',
        image: 'logo.png',
      },
      {
        id: 3,
        name: 'The Fullstack Fitted Cap',
        category: 'cat1',
        quantity: 10,
        price: 15.99,
        discount: 30,
        code: 'P-1',
        image: 'logo.png',
      },
      {
        id: 4,
        name: 'The Fullstack Jacket',
        category: 'cat1',
        quantity: 10,
        price: 49.99,
        discount: 30,
        code: 'P-1',
        image: 'logo.png',
      },
    ];
  }

  static getUser() {
    return {
      username: 'test',
      accessToken: 'testAccessToken',
      email: 'test@example.com',
      id: 1,
      lastLoginAt: '2022-09-06T19:01:18.065Z',
      refreshToken: 'testRefreshToken',
    };
  }
}
