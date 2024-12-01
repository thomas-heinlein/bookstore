FROM amazoncorretto:21.0.4-alpine3.18
WORKDIR /app
COPY build/libs/backend.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
