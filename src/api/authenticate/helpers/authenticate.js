'use strict';

/**
 * authenticate service
 */
const speakeasy = require('speakeasy');

module.exports = () => ({
    generateOtp: () => {
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            digits: 6,
        });
        return { secret: secret.base32, otp };
    }

});
