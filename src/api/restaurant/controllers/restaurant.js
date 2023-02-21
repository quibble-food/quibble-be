'use strict';

/**
 * restaurant controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// const temp = async (ctx , next ) => {
//     console.log(ctx);
//     ctx.body = 'Hello World!';
// }
// const routeFunctions = [
//     temp
// ]

module.exports = createCoreController('api::restaurant.restaurant' ,({ strapi }) => ({
    async temp(ctx , next ) {
        console.log(ctx);
        ctx.body = 'Hello World!';
    }
}));
