# app 

App.vue is the main entrypoint to the app. 

## data 

- `user` 

  stores user data returned from authentication route 

**initial value:** `[object Object]` 

- `authToken` 

  stores the auth token returned from authentication route.
  this is used for every subsequent REST call. 

**initial value:** `[object Object]` 

## computed properties 

- `isLoggedIn` 

  tells us if the user is logged in
  since empty objects evaluate to true in JS (crazy, i know)
  we use a lodash function to evaluate an empty object. 

   **dependencies:** `user` 


## methods 

- `saveToken(token)` 

  save the authtoken to localstorage 

- `logout()` 

  clear the tokens when the user logs out 

