export default () =>
  ({ env }) => ({
    "entity-notes": {
      enabled: true,
    },
    "preview-button": {
      config: {
        contentTypes: [
          {
            uid: "api::page.page",
            draft: {
              url: `${env("PREVIEW_URL", "strapi")}/api/preview`,
              query: { 
                preview_secret: `${env("PREVIEW_SECRET", "strapi")}`,
                url: '{url}',
                status: 'draft'
             },
            },
            published: { url: `${env("PREVIEW_URL", "strapi")}` },
          },
        ],
      },
    },
  });
