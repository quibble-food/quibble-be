module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/login',
      handler: 'login.loginCustomer',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
