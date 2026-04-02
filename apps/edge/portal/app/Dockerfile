FROM node:20-alpine
WORKDIR /app
COPY dist/apps/edge/portal/app .
# Add workspace_modules if they exist (Nx build artifact)
COPY dist/apps/edge/portal/app/workspace_modules ./workspace_modules 2>/dev/null || true
RUN npm install --production
CMD ["node", "main.js"]
