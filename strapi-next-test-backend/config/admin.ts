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
      allowedOrigins: [env("CLIENT_URL"), "http://127.0.0.1:3000"],

      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({
          documentId,
          populate: null,
          fields: ["url"],
        });
        const { url } = document;

        const urlSearchParams = new URLSearchParams({
          secret: env("PREVIEW_SECRET"),
          ...(url && { url }),
          uid,
          status,
        });

        const previewURL = `${env("CLIENT_URL")}/api/preview?${urlSearchParams}`;
        return previewURL;
      },
    },
  },
});
