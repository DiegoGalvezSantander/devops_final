
FROM node:18-alpine AS build

WORKDIR /app



# Copiamos los archivos de configuración de Node

COPY package*.json ./

RUN npm install



# Copiamos el resto del código (src, public, config files)

COPY . .



# Construimos la aplicación para producción

RUN npm run build



# ETAPA 2: Servidor (Run)

# Usamos Nginx para servir los archivos estáticos de forma rápida

FROM nginx:alpine

WORKDIR /usr/share/nginx/html



# Limpiamos los archivos por defecto de Nginx

RUN rm -rf ./*



# Copiamos los archivos compilados desde la etapa anterior

# Vite por defecto guarda el resultado en la carpeta 'dist'

COPY --from=build /app/dist .



# SEGURIDAD: Configuramos Nginx para que no use el usuario root

RUN touch /var/run/nginx.pid && \

  chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx



# Exponemos el puerto estándar para web

EXPOSE 80



# Iniciamos el servidor

CMD ["nginx", "-g", "daemon off;"]