const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    // Get all blog posts
    async find(ctx) {
        const entities = await strapi.services.blog.find(ctx.query);
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.blog }));
    },

    // Get a single blog post by ID
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.blog.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.blog });
    },

    // Create a new blog post
    async create(ctx) {
        const entity = await strapi.services.blog.create(ctx.request.body);
        return sanitizeEntity(entity, { model: strapi.models.blog });
    },

    // Update an existing blog post
    async update(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.blog.update({ id }, ctx.request.body);
        return sanitizeEntity(entity, { model: strapi.models.blog });
    },

    // Delete a blog post
    async delete(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.blog.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.blog });
    }
};