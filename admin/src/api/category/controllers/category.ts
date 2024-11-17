/**
 *  category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;

      if (!slug) {
        return ctx.badRequest("Slug parameter is missing");
      }

      const entity = await strapi
        .service("api::category.category")
        .findOne(slug);

      if (!entity) {
        return ctx.notFound("Entity not found");
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
