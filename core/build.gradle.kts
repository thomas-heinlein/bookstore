plugins {
    java
}

repositories {
    mavenCentral()
}

tasks.withType<Test> {
    useJUnitPlatform()
}