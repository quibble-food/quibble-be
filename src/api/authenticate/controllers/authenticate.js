'use strict';

/**
 * A set of functions called "actions" for `authenticate
 */
const authenticate = require('../helpers/authenticate.js')();
const { ApplicationError, ValidationError } = require('../../../utils/errors.js');
const accountSid = "ACb281a0c9111b910bc232be7168b0b945"; //process.env.TWILIO_ACCOUNT_SID;
const authToken = "746e4067cfb9ff55231fddc8944d0e88"; //process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken,  { httpAgent: { rejectUnauthorized: false } });

module.exports = {
  updatePhoneNumber: async (ctx, next) => {
    try {
      const  {phone} = ctx.request.body
      console.log(phone)
      const user = ctx.state.user

      const otp = authenticate.generateOtp()
      const params = {phone , otp : otp.otp , confirmed : false}
      
      await client.messages
        .create({
          body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
          from: '+12542775123',
          to: '+91 76308 81537s'
        })
        .then(message => console.log(message.sid));
      const res = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: params,
        populate: ['role'],
      });
      
      // const userObj = await strapi.query('plugin::users-permissions.user').findOne({
      //   where: {
      //     $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      //   },
      // });
      // const books = await strapi.entityService.findOne('api::user.user' , 1)
      // services('api::authenticate.find');

      // console.log(books)
      ctx.body = {data : res}
    } catch (err) {
      console.log("error" , err)
      throw new ApplicationError(err);
    }
  },
  verifyOtp: async (ctx, next) => {
    try {
      const {otp} = ctx.request.body
      const user = ctx.state.user
      console.log(user.otp)

      if (otp == user.otp){

        const res = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
          data: {confirmed : true},
          populate: ['role'],
        });
        ctx.body = {data : res}
      }else{
        throw new ValidationError('OTP incorrect');
      }
    }
    catch (err) {
      console.log("error" , err)
      ctx.body = err;
    }
  }
  // find: async (ctx) => {
  //   const books = await strapi.services.books.find();
  //   return books;
  // },

   // const user = await strapi.entityService.findOne(
      //   'plugin::users-permissions.user',
      //   ctx.state.user.id
      // );
};
