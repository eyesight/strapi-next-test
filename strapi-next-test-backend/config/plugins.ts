export default () =>
  ({ env }) => ({
    "entity-notes": {
      enabled: true,
    },
    navigation: {
      enabled: true,
      config: {
          contentTypes: ['api::page.page'],
          defaultContentTypes: ['api::page.page'],
          contentTypesNameFields: {
              'api::page.page': ['title']
          },
          pathDefaultFields: {
              'api::page.page': ['url']
          },
          allowedLevels: 3,
          gql: {
            navigationItemRelated: ['Page']
          },
      }
  }
  });
