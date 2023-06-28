'use strict';

/**
 * A set of functions called "actions" for `login`
 */

const authenticate = require('../../authenticate/helpers/authenticate.js')();
const { ApplicationError, ValidationError } = require('../../../utils/errors.js');
const { issue , sanitizeUser} = require('../../../utils/jwt.js')();


module.exports = {
  loginCustomer: async (ctx, next) => {
    try {
      const {phone} = ctx.request.body

      const otp = authenticate.generateOtp()
      const params = { otp : otp.otp}

      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: {
          phone: phone,
        },
      });
      if (!user) {
        throw new ValidationError('Invalid identifier or password');
      }
      if (user.blocked === true) {
        throw new ApplicationError('Your account has been blocked by an administrator');
      }
       await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: params,
        populate: ['role'],
      });
      return ctx.send({
        jwt: issue({ id: user.id }),
        user: user // await sanitizeUser(user, ctx),
      });
    } catch (err) {
      throw new ApplicationError(err.message);
    }
  },
};
