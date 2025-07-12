export default () => (
    { env }) => ({
        'entity-notes': {
            enabled: true,
        },
        defaultLimit: 10,
        maxLimit: 100,
        playgroundAlways: env.bool('GRAPHQL_PLAYGROUND', false),
        // Enable draft and publish filtering via context or custom resolvers if needed
    }
);
