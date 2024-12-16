# Bookstore

Sample application for a bookstore. Work in progress.

## Overview

* Backend: Java, Spring Boot, Gradle, PostgreSQL, Flyway
* Frontend: React, Vite, React Hook Form, React Router
* Keycloak for authentication

## How to run

```
docker-compose up --build
./initialize-kc.sh
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