FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM busybox:1.36.1 AS runner
WORKDIR /site
COPY --from=builder /app/dist ./
EXPOSE 3000
CMD ["sh", "-c", "httpd -f -p ${PORT:-3000} -h /site"]
