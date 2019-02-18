# signup 

## data 

- `status` 

**initial value:** `'ready'` 

- `form` 

**initial value:** `[object Object]` 

- `show` 

**initial value:** `true` 

- `errors` 

**initial value:** `[object Object]` 

## computed properties 

- `validated` 

   **dependencies:** `form`, `form` 


## events 

- `login` 

  tell the parent we've logged in with this token info. 

## methods 

- `onSubmit(e)` 

  Submit registration info to the server, and then save the response to the parent component. 

