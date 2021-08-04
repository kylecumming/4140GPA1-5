Steps to execute A5

- step 1
    
    Clone the repository using `git clone https://git.cs.dal.ca/kariya/csci4140-group17.git` and navigate into the directory.
    
- step 2
    
   Switch to the assignment 3 branch, using `git checkout A5`.
    
- step 3 
    
    Connect to the Dal network using Cisco AnyConnect.

- step 4

    If running the Company agent UI, start the company service using `node api/company_agent_service_api.js -c w`. Here, we are starting the UI for Company W, however, different companies (w, x, y, z) can be passed as the -c parameter. Otherwise, start the `node api/client_service_api.js -c w`, or passing any other parameter as the company. If successful there will be the messages "Listening on port 3000..." and "Connected to the MySQL server.".

- step 5

    In a separate terminal, if running the Company agent UI, navigate to the UI folder using `cd react/ui-agent-W`, replacing 'W' with the name of the company you with to run (W, X, Y, Z). Otherwise `cd react/ui-W`, again substituting 'W' for the name of the company, being W, X, Y or Z.

- step 6

    Run `npm install` if needed, followed by `npm start` and wait for "http://localhost:2000" to open in a tab.
