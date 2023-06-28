console.log('Loading plugins configuration...');

module.exports = ({ env }) => ({
    //...
    // 'users-permissions': {
    //   jwtSecret: env('JWT_SECRET', 'ZHIVlgjHrmNdrPzv3mloGQ=='),
    //   jwtExpiresIn: env.int('JWT_EXPIRES_IN', 1*60), // 1 days
    // },
    // jwt: {
    //   secret: env('JWT_SECRET'),
    //   expiresIn: 1, // 1 day in seconds
    // },
    jwtSecret: process.env.JWT_SECRET || 'yourSecretKey',
    //...
});