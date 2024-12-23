module.exports = {
  routes: [
      {
          method: 'GET',
          path: '/portfolios',
          handler: 'portfolio.find',
      },
      {
          method: 'GET',
          path: '/portfolios/:id',
          handler: 'portfolio.findOne',
      },
      {
          method: 'POST',
          path: '/portfolios',
          handler: 'portfolio.create',
      },
      {
          method: 'PUT',
          path: '/portfolios/:id',
          handler: 'portfolio.update',
      },
      {
          method: 'DELETE',
          path: '/portfolios/:id',
          handler: 'portfolio.delete',
      },
  ],
};