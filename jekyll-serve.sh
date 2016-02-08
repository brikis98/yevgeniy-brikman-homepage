#!/bin/bash

set -e

LIMIT_POSTS="${LIMIT_POSTS:-5}"

if [[ "$LIMIT_POSTS" -gt 0 ]]; then
  echo -e "\033[1;33m[WARN] Telling jekyll to only generate the last $LIMIT_POSTS posts. To change this limit, set the LIMIT_POSTS environment variable.\033[0m"
fi

bundle exec jekyll serve --drafts --incremental --limit_posts "$LIMIT_POSTS" --host 0.0.0.0