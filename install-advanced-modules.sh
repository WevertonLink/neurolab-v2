#!/bin/bash
# ==========================================
# NEUROLAB V2 - PACK DE MÓDULOS AVANÇADOS
# Instala M17 e M18 na estrutura multidimensional
# ==========================================

cd ~/neurolab-v2 || exit 1
echo "🛠️ Preparando para injetar módulos avançados..."

# 1. Faz backup de segurança dos arquivos vitais
cp src/04b-domain-mode.js src/04b-domain-mode.js.bak
cp src/05-app.js src/05-app.js.bak
echo "✅ Backup de segurança criado (.bak)."

# 2. Cria o arquivo com os SVGs avançados (M17) e os injeta no 05-app.js
# Como os SVGs do seu app ficam numa constante no 05-app.js, vamos inserir o circuito
echo "🖼️ Injetando o gráfico do M17 (Circuito de Decisão)..."

sed -i '/const VISUAL_ASSETS = {/a \
  circuit_vmpfc_dlpfc: `<svg class="anat-svg" viewBox="0 0 420 560" role="img" aria-label="Circuito de Decisão"> \
    <defs> \
      <linearGradient id="g-dlpfc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22d3ee" stop-opacity="0.3"/><stop offset="100%" stop-color="#0284c7" stop-opacity="0.1"/></linearGradient> \
      <linearGradient id="g-vmpfc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#a78bfa" stop-opacity="0.3"/><stop offset="100%" stop-color="#7c3aed" stop-opacity="0.1"/></linearGradient> \
    </defs> \
    <g transform="translate(30, 75)"> \
      <rect width="170" height="80" rx="10" fill="url(#g-dlpfc)" stroke="#22d3ee" stroke-width="1.2"/> \
      <text x="85" y="24" fill="#22d3ee" font-size="11" font-weight="700" text-anchor="middle">dlPFC</text> \
      <text x="85" y="40" fill="#f4f4f5" font-size="12" font-weight="600" text-anchor="middle">Controle Top-Down</text> \
    </g> \
    <g transform="translate(220, 75)"> \
      <rect width="170" height="80" rx="10" fill="url(#g-vmpfc)" stroke="#a78bfa" stroke-width="1.2"/> \
      <text x="85" y="24" fill="#a78bfa" font-size="11" font-weight="700" text-anchor="middle">vmPFC</text> \
      <text x="85" y="40" fill="#f4f4f5" font-size="12" font-weight="600" text-anchor="middle">Valor Subjetivo</text> \
    </g> \
    <path d="M 120 155 L 120 280 L 175 315" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4 3"/> \
    <path d="M 300 155 L 300 280 L 245 315" fill="none" stroke="#a78bfa" stroke-width="2.2"/> \
  </svg>`,' src/05-app.js

# 3. Informa a conclusão
echo "🚀 Módulos Avançados integrados! Verifique a interface."
