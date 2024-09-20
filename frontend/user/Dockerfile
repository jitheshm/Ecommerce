# Use an official Node.js runtime as the base image
FROM node:alpine as base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
# Development stage

FROM base AS dev
EXPOSE  3000
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS build
RUN npm run build


# Nginx stage
FROM nginx:alpine AS prod
# Copy the built files from the previous stage to Nginx's html directory

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /var/www/
# Expose port 80 to the outer world
EXPOSE 80

