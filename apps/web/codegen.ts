import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['http://localhost:8080/graphql'],
  watch: true,
  config: {
    scalars: {
      DateTime: 'Date',
    },
  },
  documents: './apollo/schema/*.graphql',
  hooks: { afterAllFileWrite: ['prettier --write', 'eslint --fix'] },
  generates: {
    './apollo/generated-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './apollo/possible-type.ts': {
      plugins: ['fragment-matcher'],
    },
  },
};
export default config;
