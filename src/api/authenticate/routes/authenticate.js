module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/authenticate',
     handler: 'authenticate.updatePhoneNumber',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/authenticate/verifyOtp',
      handler: 'authenticate.verifyOtp',
      config: {
        policies: [],
        middlewares: [],
      },
     }
  ],
};
