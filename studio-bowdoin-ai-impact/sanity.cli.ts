import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'di7j15mq',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  // The Studio now lives inside the Next.js app's own folder (was a
  // sibling before), so the app root is just one level up. No src/ dir
  // there — source lives in app/, components/, lib/, data/ at its root,
  // alongside node_modules, so the glob is scoped to those four
  // directories explicitly rather than **/* (which would otherwise
  // crawl the entire node_modules tree, including this Studio's own).
  typegen: {
    enabled: true,
    path: '../{app,components,lib,data}/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../lib/sanity/sanity.types.ts',
    overloadClientMethods: true,
  },
})
