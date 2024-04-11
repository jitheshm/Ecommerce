# Use an official Node.js runtime as the base image
FROM node:alpine as base
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./
# Install dependencies using npm
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .


FROM base AS dev
EXPOSE  3000
CMD ["npm", "run", "dev"]


FROM base AS prod
RUN npm run build



