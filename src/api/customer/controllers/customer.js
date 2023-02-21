'use strict';

/**
 * customer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer.customer');

module.exports.temp = (ctx) => {

      // Your custom API logic goes here
      console.log("helo")
      const data = "sdfgsdg"
      ctx.send(data);
    }
