import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: 'http://127.0.0.1:1337/graphql',
    documents: ['src/graphql/*.graphql'],
    generates: {
        './src/graphql/generated/index.tsx': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                addTypename: true,
            }
        }
    }
}

export default config;