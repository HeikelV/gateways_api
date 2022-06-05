# simple-test-crud

## Requirements
1. NodeJS 14.7 or above
2. MongoDB Server

## Install instructions

1. Prepare your enviroments variables before run the project:
- Rename ```.env_example``` to ```.env```
- Configure the ```DATABASE_URL``` with your Mongo DB connection's link
- Example : ```DATABASE_DEV_URL=mongodb://localhost:27017/musala```


2. Open yhe terminal in the project root directory and run:
  
    ``` 
    $ npm install
    $ npm run start 
    ```
3. Your backend server will be available in ```http://localhost:5000```

## Automated Tests

For code testing (with Jest and Supertest, in this case), 

1. Configure another database connection for testing:
 - Open ```.env``` file
 - Configure the ```DATABASE__DEV_URL``` with your Mongo DB connection's link
 - Example : ```DATABASE_DEV_URL=mongodb://localhost:27017/musala_test```

2. Open the terminal in the project root directory and run:
   ```npm run test```

