#!/bin/bash

# Detectar archivos modificados
FILES=$(git diff --cached --name-only)

# Si no hay archivos en staging, agregarlos
if [ -z "$FILES" ]; then
  git add .
  FILES=$(git diff --cached --name-only)
fi

# Si aun no hay cambios, salir
if [ -z "$FILES" ]; then
  echo "No hay cambios para subir."
  exit 0
fi

# Crear mensaje personalizado
MSG="Actualiza: $(echo $FILES | tr '\n' ',' | sed 's/,$//')"

# Hacer commit y push
git commit -m "$MSG"
git push origin main
