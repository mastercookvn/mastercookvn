FROM eclipse-temurin:27-jre

WORKDIR /app

COPY backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
