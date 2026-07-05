# Bước 1: Build mã nguồn bằng Maven
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Bước 2: Tạo Image chạy ứng dụng JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy file jar từ bước build
COPY --from=builder /app/target/*.jar children-vaccine-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "children-vaccine-app.jar"]
