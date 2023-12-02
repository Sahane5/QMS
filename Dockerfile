# Use the official Node.js LTS image as the base image
FROM node:14 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN npm run build

# Use NGINX as the production server
FROM nginx:latest

# Copy the built files from the builder stage to the NGINX server
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the generated NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]
