# Bookstore

Sample application for a bookstore. Work in progress.

## Overview

This project demonstrates a sample bookstore application, showcasing modern development practices and integrations. 
It is designed to handle user authentication, backend processing, and a responsive frontend for users to browse and purchase books.

* Backend: Spring Boot, Java, Gradle
* Database: PostgreSQL
* Frontend: React, Vite, React Hook Form, React Router
* Keycloak for authentication

## How to run

### Database and Keycloak

```
docker-compose up --build
./initialize-kc.sh
```

### Backend

```
./gradlew :backend:boorRun
```

### Frontend
```
cd frontend
yarn install
yarn dev
```


## Test

### Backend

```
./gradlew :backend:test
```

### Frontend
```
cd frontend
yarn test
```

### Integration
```
./gradlew :backend:integration
```