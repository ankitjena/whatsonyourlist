The project uses React for the frontend and Nodejs for the backend. Strictly use yarn as the package manager. 

## Setup Instructions
- Fork and clone the project.
- `cd whatsonyourlist_`
- `yarn install`
- `cd client && yarn install`
- Create a project in google developer console and create OAuth2 credentials, note down the `client_id` and `client_secret`. Set the callback url to `http://localhost:3000/auth/redirect`.
- Add the `client_id` and `client_secret` to `.env` file inside client folder as `REACT_APP_CLIENT_ID` and `REACT_APP_CLIENT_SECRET`.
- Create a .env file in root of the project and add `PORT` and `JWT_SECRET` to it.
  
## Running instructions
- Start the server with `yarn start`
- Start the client with `cd client && yarn start`

> NOTE: If your face any issue with setup raise an issue.