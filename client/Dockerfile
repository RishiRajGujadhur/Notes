FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./   
RUN npm install 
COPY . . 
RUN npm run build 

# Serve production build
FROM nginx:alpine 
COPY --from=build /app/build /usr/share/nginx/html
