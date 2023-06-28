'use strict';

/**
 * Jwt.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const strapi = require('@strapi/strapi')

module.exports = ()=> ({
  getToken(ctx) {
    let token;

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      const parts = ctx.request.header.authorization.split(/\s+/);

      if (parts[0].toLowerCase() !== 'bearer' || parts.length !== 2) {
        return null;
      }

      token = parts[1];
    } else {
      return null;
    }

    return this.verify(token);
  },

  issue(payload, jwtOptions = {}) {

      // const temp= _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
      return jwt.sign(
        _.clone(payload.toJSON ? payload.toJSON() : payload),
        process.env.JWT_SECRET,
        jwtOptions
      )
  },

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET, 
        {},
        (err, tokenPayload = {}) => {
          if (err) {
            return reject(new Error('Invalid token.'));
          }
          resolve(tokenPayload);
        }
      );
    });
  },
  sanitizeUser(user, ctx) {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
  
    return sanitize.contentAPI.output(user, userSchema, { auth });
  }
  
});
