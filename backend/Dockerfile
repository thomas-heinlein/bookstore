FROM amazoncorretto:21.0.4-alpine3.18 AS build
WORKDIR /app
COPY . .
RUN ./gradlew :backend:bootJar

FROM amazoncorretto:21.0.4-alpine3.18
WORKDIR /app
COPY --from=build /app/backend/build/libs/backend.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
