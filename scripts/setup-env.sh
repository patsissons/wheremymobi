#!/bin/bash

# .env.local
if [ ! -r ".env.local" ]; then
  yarn run vercel env pull .env.local && sed -i '' -e '/^VERCEL/d' .env.local
fi
