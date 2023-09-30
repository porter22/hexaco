# Use an official Python runtime as the parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements file into the container
COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app source code to the working directory
COPY . .

COPY config.py /usr/src/app/backend/config.py

ENV PYTHONPATH "${PYTHONPATH}:/usr/src/app/hexaco-backend"
ENV PYTHONUNBUFFERED 1

# Start the app
CMD ["flask", "run"]
