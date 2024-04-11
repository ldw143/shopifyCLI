// This is an autogenerated file. Don't edit this file manually.
import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs'

const data: ReferenceEntityTemplateSchema = {
  name: 'hydrogen deploy',
  description: `Builds and deploys your Hydrogen storefront to Oxygen. Requires an Oxygen deployment token to be set with the \`--token\` flag or an environment variable (\`SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN\`). If the storefront is [linked](https://shopify.dev/docs/api/shopify-cli/hydrogen-commands/hydrogen-link) then the Oxygen deployment token for the linked storefront will be used automatically.`,
  overviewPreviewDescription: `Builds and deploys your Hydrogen storefront to Oxygen. Requires an Oxygen deployment token to be set with the \`--token\` flag or an environment variable (\`SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN\`). If the storefront is [linked](https://shopify.dev/docs/api/shopify-cli/hydrogen-commands/hydrogen-link) then the Oxygen deployment token for the linked storefront will be used automatically.`,
  type: 'command',
  isVisualComponent: false,
  defaultExample: {
    codeblock: {
      tabs: [
        {
          title: 'hydrogen deploy',
          code: './examples/hydrogen-deploy.example.sh',
          language: 'bash',
        },
      ],
      title: 'hydrogen deploy',
    },
  },
  definitions: [
  {
    title: 'Flags',
    description: 'The following flags are available for the `hydrogen deploy` command:',
    type: 'hydrogendeploy',
  },
  ],
  category: 'hydrogen',
  related: [
  ],
}

export default data