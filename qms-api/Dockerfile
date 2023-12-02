# Use an official Node.js LTS image as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 (assuming your Node.js app runs on port 3000)
EXPOSE 3000

# Command to run on container start
CMD ["npm", "run", "dev"]
