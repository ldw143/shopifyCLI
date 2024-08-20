// This is an autogenerated file. Don't edit this file manually.
import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs'

const data: ReferenceEntityTemplateSchema = {
  name: 'app logs sources',
  description: `The output source names can be used with the \`--source\` argument of \`shopify app logs\` to filter log output. Currently only function extensions are supported as sources.`,
  overviewPreviewDescription: `Print out a list of sources that may be used with the logs command.`,
  type: 'command',
  isVisualComponent: false,
  defaultExample: {
    codeblock: {
      tabs: [
        {
          title: 'app logs sources',
          code: './examples/app-logs-sources.example.sh',
          language: 'bash',
        },
      ],
      title: 'app logs sources',
    },
  },
  definitions: [
  {
    title: 'Flags',
    description: 'The following flags are available for the `app logs sources` command:',
    type: 'applogssources',
  },
  ],
  category: 'app',
  related: [
  ],
}

export default data