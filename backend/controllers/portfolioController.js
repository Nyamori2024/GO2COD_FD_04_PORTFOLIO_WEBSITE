const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    // Get all portfolio items
    async find(ctx) {
        const entities = await strapi.services.portfolio.find(ctx.query);
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.portfolio }));
    },

    // Get a single portfolio item by ID
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.portfolio.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.portfolio });
    },

    // Create a new portfolio item
    async create(ctx) {
        const entity = await strapi.services.portfolio.create(ctx.request.body);
        return sanitizeEntity(entity, { model: strapi.models.portfolio });
    },

    // Update an existing portfolio item
    async update(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.portfolio.update({ id }, ctx.request.body);
        return sanitizeEntity(entity, { model: strapi.models.portfolio });
    },

    // Delete a portfolio item
    async delete(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.portfolio.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.portfolio });
    }
};