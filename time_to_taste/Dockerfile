# React Frontend Dockerfile
FROM node:20 AS build
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci --legacy-peer-deps

# 複製所有源代碼
COPY . .

# 建置 React 應用（Vite 輸出到 dist）
RUN npm run build

# 使用 nginx 提供靜態文件
FROM nginx:alpine

# 複製建置好的文件到 nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 複製 nginx 配置（支援 React Router）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露前端端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
