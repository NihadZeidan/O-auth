# O-auth


## OAuth Provider Name: LinkedIn

### Done By:

- Mosab Al-Omari
- Mohammad Azzam
- Zakieh Abu Yassen
- Ishaq Athamneh
- Nihad Zeidan



#### General Comments

A back-end application, with in-memory database.
Uses a middleware to Authorize user access to third-party provider.
Login authorization using LinkedIn as an OAuth provider.


#### Pros

- Login using LinkedIn account
- No need for saving user passwords in database
- Easy to integrate in the server

#### Cons

- You need to create an organization in LinkedIn to be able to use the OAuth provider API
- One token every  minutes
- limited to 500 requests per day

### Ratings and Reviews

#### Documentation

A back-end application, Utilizing express server, with an in-memory database. Where the front-end is used to show the retrieved data in JSON format.
Uses a middleware to Authorize user access to third-party provider, giving them access to public information to the user's linkeIn account.
Login authorization using LinkedIn as an OAuth provider.
The app is deployed to Heroku.

#### Systems Requirements

`npm i`

#### Ramp-Up Projections

How long would/should it take a team of mid-junior developers to become productive? 6 hours


### Code Demos

- [live/running application](https://o-auth-team.herokuapp.com/)
- [code repository](https://github.com/NihadZeidan/O-auth)

### Operating Instructions

- `npm start`
- `nodemon`
- Endpoint: `/`
  - main page with login button
- Endpoint: `/oauth`
  - Returns a JSON object with the generated token and the username.