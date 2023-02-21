'use strict';

/**
 * restaurant router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant' );
// module.exports ={
//     routes: [
//       { // Path defined with an URL parameter
//         method: 'GET',
//         path: '/restaurants/rr', 
//         handler: 'restaurant.temp',
//       }
//     ]
//   }