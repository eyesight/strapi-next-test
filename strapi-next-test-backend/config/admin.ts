// Export Strapi config including salts, secrets, and preview config
export default ({ env }) => ({
  auth: {
    secret: env('STRAPI_ADMIN_JWT_SECRET'), // admin JWT secret from .env
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'), // API token salt
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'), // transfer token salt
    },
  }
});
