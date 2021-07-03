Steps to execute A3

- step 1
    
    Clone the repository using `git clone https://git.cs.dal.ca/kariya/csci4140-group17.git` and navigate into the directory.
    
- step 2
    
   Switch to the assignment 3 branch, using `git checkout A3`.
    
- step 3 
    
    Connect to the Dal network using Cisco AnyConnect.

- step 4

    Start one of either the company or client service, using `node company_agent_service_api.js` or `node client_service_api.js`. If successful there will be the messages "Listening on port 3000..." and "Connected to the MySQL server.".

- step 5

    Using Postman, create a PUT request and input the body parameters under x-www-form-urlencoded to test the endpoints as listed in the assignment report, such as "http://localhost:3000/api/company/updatePO17" with parameters for "poNo17" and "status17". 
