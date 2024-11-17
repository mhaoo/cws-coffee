/**
 * category service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::category.category", {
  async findOne(slug, params = {}) {
    const entity = await strapi.db.query("api::category.category").findOne({
      where: { slug },
      ...params,
    });
    return entity;
  },
});
