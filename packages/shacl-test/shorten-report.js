#!/usr/bin/env node

import { createPlaygroundUrl } from '@lindas/shacl-playground'
import { shorten } from '@lindas/s'

  ;(async function () {
  process.stdout.write(await shorten(createPlaygroundUrl(process.argv[2], process.argv[3])))
})()
