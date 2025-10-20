# --- 第1階段：建置 React 前端 ---
FROM node:20 AS frontend-build
WORKDIR /app/frontend

# 複製所有前端檔案
COPY time_to_taste/ .

# 清理並重新安裝所有依賴（確保原生模組版本正確）
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install

# 建置前端
RUN npm run build

# --- 第2階段：建置 Spring Boot 後端 ---
FROM maven:3.8-openjdk-17 AS backend-build
WORKDIR /app/backend
COPY demo/pom.xml ./
COPY demo/mvnw ./
COPY demo/mvnw.cmd ./
COPY demo/.mvn ./.mvn
RUN chmod +x mvnw
COPY demo/src ./src
# 複製前端打包好的檔案到 Spring Boot 的 static 資源夾
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN ./mvnw clean package -DskipTests

# --- 第3階段：執行環境 ---
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
