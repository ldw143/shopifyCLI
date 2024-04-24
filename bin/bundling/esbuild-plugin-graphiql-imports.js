import { readFile } from 'fs/promises'

const GraphiQLImportsPlugin = {
  name: 'GraphiQLImportsPlugin',
  setup(build) {
    // GraphiQL uses require.resolve with paths that doesn't work well with esbuild
    build.onLoad({filter: /.*server\.js/}, async (args) => {
      const contents = await readFile(args.path, 'utf8')
      return {
        contents: contents
          .replace('@shopify/app/assets/graphiql/favicon.ico', './assets/graphiql/favicon.ico')
          .replace('@shopify/cli-kit/assets/style.css', './assets/style.css'),
      }
    })
  },
}
export default GraphiQLImportsPlugin
