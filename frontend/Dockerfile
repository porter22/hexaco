# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

# Start the app
CMD ["npm", "start"]
