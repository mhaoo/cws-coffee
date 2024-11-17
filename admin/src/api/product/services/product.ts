/**
 * product service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::product.product", {
  async findOne(slug, params = {}) {
    const entity = await strapi.db.query("api::product.product").findOne({
      where: { slug },
      ...params,
    });
    return entity;
  },
});
