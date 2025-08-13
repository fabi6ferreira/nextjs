# Illimitatus — StackBlitz Ready

Single Next.js app com:
- Auth (login/logout) via cookie
- Dashboard com dados de API (in-memory)
- Notifications, Chatbot, Upgrade
- **n8n opcional** via `N8N_CHATBOT_URL`

## Correr
```
npm install
npm run dev
```
Abrir http://localhost:3000 → `/login`

Credenciais: `demo@demo.com` / `demo123`

## n8n (opcional)
Cria um webhook no n8n (POST) e define:
```
N8N_CHATBOT_URL="https://.../webhook/<id>"
```
