module.exports = {
  routes: [
      {
          method: 'GET',
          path: '/blogs',
          handler: 'blog.find',
      },
      {
          method: 'GET',
          path: '/blogs/:id',
          handler: 'blog.findOne',
      },
      {
          method: 'POST',
          path: '/blogs',
          handler: 'blog.create',
      },
      {
          method: 'PUT',
          path: '/blogs/:id',
          handler: 'blog.update',
      },
      {
          method: 'DELETE',
          path: '/blogs/:id',
          handler: 'blog.delete',
      },
  ],
};