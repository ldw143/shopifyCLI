// This is an autogenerated file. Don't edit this file manually.
export interface themedev {
  /**
   * The environment to apply to the current command.
   * @environment SHOPIFY_FLAG_ENVIRONMENT
   */
  '-e, --environment <value>'?: string

  /**
   * Set which network interface the web server listens on. The default value is 127.0.0.1.
   * @environment SHOPIFY_FLAG_HOST
   */
  '--host <value>'?: string

  /**
   * Skip hot reloading any files that match the specified pattern.
   * @environment SHOPIFY_FLAG_IGNORE
   */
  '-x, --ignore <value>'?: string

  /**
   * The live reload mode switches the server behavior when a file is modified:
- hot-reload Hot reloads local changes to CSS and sections (default)
- full-page  Always refreshes the entire page
- off        Deactivate live reload
   * @environment SHOPIFY_FLAG_LIVE_RELOAD
   */
  '--live-reload <value>'?: string

  /**
   * Disable color output.
   * @environment SHOPIFY_FLAG_NO_COLOR
   */
  '--no-color'?: ''

  /**
   * Prevents files from being deleted in the remote theme when a file has been deleted locally. This applies to files that are deleted while the command is running, and files that have been deleted locally before the command is run.
   * @environment SHOPIFY_FLAG_NODELETE
   */
  '-n, --nodelete'?: ''

  /**
   * The file path or URL. The file path is to a file that you want updated on idle. The URL path is where you want a webhook posted to report on file changes.
   * @environment SHOPIFY_FLAG_NOTIFY
   */
  '--notify <value>'?: string

  /**
   * Hot reload only files that match the specified pattern.
   * @environment SHOPIFY_FLAG_ONLY
   */
  '-o, --only <value>'?: string

  /**
   * Automatically launch the theme preview in your default web browser.
   * @environment SHOPIFY_FLAG_OPEN
   */
  '--open'?: ''

  /**
   * Password generated from the Theme Access app.
   * @environment SHOPIFY_CLI_THEME_TOKEN
   */
  '--password <value>'?: string

  /**
   * The path to your theme directory.
   * @environment SHOPIFY_FLAG_PATH
   */
  '--path <value>'?: string

  /**
   * Local port to serve theme preview from.
   * @environment SHOPIFY_FLAG_PORT
   */
  '--port <value>'?: string

  /**
   * Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com, https://example.myshopify.com).
   * @environment SHOPIFY_FLAG_STORE
   */
  '-s, --store <value>'?: string

  /**
   * The password for storefronts with password protection.
   * @environment SHOPIFY_FLAG_STORE_PASSWORD
   */
  '--store-password <value>'?: string

  /**
   * Theme ID or name of the remote theme.
   * @environment SHOPIFY_FLAG_THEME_ID
   */
  '-t, --theme <value>'?: string

  /**
   * Synchronize Theme Editor updates in the local theme files.
   * @environment SHOPIFY_FLAG_THEME_EDITOR_SYNC
   */
  '--theme-editor-sync'?: ''

  /**
   * Increase the verbosity of the output.
   * @environment SHOPIFY_FLAG_VERBOSE
   */
  '--verbose'?: ''
}
