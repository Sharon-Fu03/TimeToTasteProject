# Spring Boot Backend Dockerfile
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app

# 複製 Maven 配置文件
COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# 下載依賴（快取層）
RUN ./mvnw dependency:go-offline -B

# 複製源代碼
COPY src ./src

# 編譯打包（跳過測試以加速建置）
RUN ./mvnw clean package -DskipTests

# 執行階段映像檔
FROM eclipse-temurin:17-jre
WORKDIR /app

# 複製打包好的 jar
COPY --from=build /app/target/*.jar app.jar

# 暴露後端端口
EXPOSE 8080

# 啟動 Spring Boot 應用
ENTRYPOINT ["java", "-jar", "app.jar"]
