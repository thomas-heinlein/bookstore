FROM amazoncorretto:21.0.4-alpine3.18
WORKDIR /app
COPY build/libs/backend.jar app.jar
EXPOSE 8081 5005
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "app.jar"]
