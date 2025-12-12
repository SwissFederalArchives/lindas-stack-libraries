#!/bin/bash
packages="yasgui yasr yasqe yasgui-utils"
for p in ${packages}; do
  rm -rf packages/${p}/build
  mkdir packages/${p}/build
  # Handle the special case where build output for yasgui-utils is named "utils"
  if [ "${p}" = "yasgui-utils" ]; then
    cp -r build/ts/packages/${p} packages/${p}/build/ts 2>/dev/null || true
    if ls build/utils* 1> /dev/null 2>&1; then
      cp build/utils* packages/${p}/build/
    fi
  else
    cp -r build/ts/packages/${p} packages/${p}/build/ts 2>/dev/null || true
    if ls build/${p}* 1> /dev/null 2>&1; then
      cp build/${p}* packages/${p}/build/
    fi
  fi
done
