import { join } from 'node:path'
import { nodeFileTrace } from '@vercel/nft'
import { sync as prependSync } from 'prepend-file'
import { writeFileSync, mkdirSync, existsSync, cpSync, rmSync } from 'node:fs'

// Define all the Amplify related directories
const amplifyDirectories = [
  join(process.cwd(), '.amplify-hosting'),
  join(process.cwd(), '.amplify-hosting', 'static'),
  join(process.cwd(), '.amplify-hosting', 'compute'),
  join(process.cwd(), '.amplify-hosting', 'compute', 'default'),
  join(process.cwd(), '.amplify-hosting', 'compute', 'default', 'node_modules'),
]

// Create directories if they do no exist already
if (existsSync(amplifyDirectories[0])) rmSync(amplifyDirectories[0], { force: true, recursive: true })

// Create directories if they do no exist already
amplifyDirectories.forEach((i) => mkdirSync(i))

const deployManifestConfig = {
  version: 1,
  routes: [
    {
      path: `/assets/*`,
      target: {
        kind: 'Static',
      },
    },
    {
      path: `/*.*`,
      target: {
        kind: 'Static',
      },
      fallback: {
        kind: 'Compute',
        src: 'default',
      },
    },
    {
      path: '/*',
      target: {
        kind: 'Compute',
        src: 'default',
      },
    },
  ],
  computeResources: [
    {
      name: 'default',
      runtime: 'nodejs20.x',
      entrypoint: 'build/index.js',
    },
  ],
  framework: {
    name: 'sveltekit',
    version: '2.5.18',
  },
}

// Write the config to .amplify-hosting/deploy-manifest.json
writeFileSync(join(process.cwd(), '.amplify-hosting', 'deploy-manifest.json'), JSON.stringify(deployManifestConfig))

cpSync(join(process.cwd(), 'build', 'client'), amplifyDirectories[1], { recursive: true })

// Ref: https://rishi.app/blog/using-vercel-nft-to-compute-runtime-dependencies-for-your-remix-express-app/
async function computeDependencies(paths = []) {
  // the whole app inside index.js,
  // include other paths that are
  // not bundled with your app builds
  const files = paths
  // Compute file trace
  const { fileList } = await nodeFileTrace(files)
  // Store set of packages
  let packages = {}
  fileList.forEach((i) => {
    if (i.includes('node_modules/')) {
      let temp = i.replace('node_modules/', '')
      temp = temp.substring(0, temp.indexOf('/'))
      packages[`node_modules/${temp}`] = true
    } else packages[i] = true
  })
  // Sort the set of packages by name (for easier difference comparison with git)
  // Dump the list of the computed packages for further references while deploying the app
  Object.keys(packages)
    .sort()
    .forEach((i) => {
      cpSync(i, join(amplifyDirectories[3], i), { recursive: true })
    })
}

prependSync(join('build', 'index.js'), `import 'dotenv/config'\n`)

computeDependencies(['./build/index.js'])
