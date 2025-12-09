#!/usr/bin/env node

import { createPlaygroundUrl } from '@lindas/shacl-playground'

// Note: URL shortening removed - just output the full playground URL
;(async function () {
  const url = await createPlaygroundUrl(process.argv[2], process.argv[3])
  process.stdout.write(url)
})()
