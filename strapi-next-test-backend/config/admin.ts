import { getPreviewPathname } from "../src/utils/getPreviewPathname";

// Export Strapi config including salts, secrets, and preview config
export default ({ env }) => ({
  auth: {
    secret: env('STRAPI_ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL')],
      handler: async (uid, { documentId, locale, status }) => {
        const doc = await strapi.entityService.findOne(uid, documentId);
        const pathname = getPreviewPathname(uid, { locale, document: doc });
        return `${env('CLIENT_URL')}${pathname}?preview_secret=${env('PREVIEW_SECRET')}&status=${status}`;
      },
    },
  },
});
