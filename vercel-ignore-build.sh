#!/bin/bash

# Dieses Skript verhindert, dass Vercel automatisch bei jedem Git-Push baut.
# Wir triggern den Build stattdessen manuell aus der GitHub Action nach den Tests.

echo "VERCEL_ENV: $VERCEL_ENV"

# Wenn der Build aus einer GitHub Action kommt (wir setzen dort eine Variable), erlauben wir ihn.
if [[ "$TRIGGER_BUILD" == "true" ]] ; then
  echo "✅ Build erlaubt (manuell getriggert nach Tests)"
  exit 1; # Exit-Code 1 bedeutet bei Vercel: "Bau fortsetzen"
else
  echo "🛑 Automatischer Build abgebrochen (Warte auf GitHub Action Tests)"
  exit 0; # Exit-Code 0 bedeutet bei Vercel: "Build überspringen"
fi
