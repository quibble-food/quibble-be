'use strict';

/**
 * authenticate service
 */

module.exports = () => ({
    find: async () => {
        const entries = await strapi.entityService.findMany("api::customer.customer")
        console.log("gello")
        return entries;
    }
});
