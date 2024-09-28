# Build Stage
FROM gradle:8-jdk17-alpine AS build
WORKDIR /build
COPY . /build
COPY .env /build/src/main/resources/.env
RUN gradle clean build -x test

# Final Stage
FROM amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build  /build/build/libs/backend-*.jar .
EXPOSE 8080
CMD java -jar backend-0.0.1-SNAPSHOT.jar