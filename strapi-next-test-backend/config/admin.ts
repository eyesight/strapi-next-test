// getPreviewPathname function
const getPreviewPathname = (uid, { locale, document }) => {
  const { slug } = document;

  switch (uid) {
    case "api::page.page": {
      if (!slug) return "/";

      const normalizedSlug = slug.startsWith('_') ? slug.slice(1) : slug;

      if (normalizedSlug === "homepage") {
        return `/${locale || ''}`.replace(/\/$/, '');
      }

      return `/${normalizedSlug}`;
    }

    case "api::blog.blog": {
      if (!slug) return "/blog";
      return `/blog/${slug}`;
    }

    default:
      return "/";
  }
};

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
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('PREVIEW_URL'),
      async handler(uid, { documentId, locale, status }) {
        // Fetch the full document (pseudo code, adapt to your data fetching)
        const document = await strapi.documents(uid).findOne({ documentId });

        // Generate pathname with your function
        const pathname = getPreviewPathname(uid, { locale, document });

        if (!pathname) {
          return null;
        }

        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: env('PREVIEW_SECRET'),
          status,
        });

        return `${env('PREVIEW_URL')}/api/preview?${urlSearchParams.toString()}`;
      },
    },
  },
});
