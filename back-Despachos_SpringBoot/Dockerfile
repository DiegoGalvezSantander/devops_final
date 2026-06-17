# ETAPA 1: Compilación (Build)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Apuntamos exactamente a la carpeta que me mostraste en la imagen
COPY Springboot-API-REST-DESPACHO/pom.xml .
COPY Springboot-API-REST-DESPACHO/src ./src

RUN mvn clean package -DskipTests

# ETAPA 2: Ejecución (Run)
FROM amazoncorretto:17-alpine
WORKDIR /app

# SEGURIDAD: Usuario sin privilegios
RUN addgroup -S despacho-group && adduser -S despacho-user -G despacho-group
USER despacho-user

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]