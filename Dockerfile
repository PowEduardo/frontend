
# Use an official Node.js runtime as a parent image
FROM node:18-bullseye-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application
RUN npm run build -- --output-path=dist

# Use an official Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]