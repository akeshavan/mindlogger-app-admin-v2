# edit-activity 

Edit activity add docs 

## props 

- `user` ***Object*** (*optional*) 

  user info object 

- `is-logged-in` ***Boolean*** (*optional*) 

  isLoggedIn bool 

- `auth-token` ***Object*** (*optional*) 

  token used for all api calls 

- `activity-set-id` ***String*** (*optional*) 

  id for the activity set. 

## data 

- `activitySetData` 

**initial value:** `[object Object]` 

- `activityData` 

**initial value:** `[object Object]` 

- `error` 

**initial value:** `[object Object]` 

- `status` 

**initial value:** `'loading'` 

- `screens` 

**initial value:** `[object Object]` 

- `swiperReady` 

**initial value:** `false` 

- `swiperOption` 

**initial value:** `[object Object]` 

## computed properties 

- `currentSlide` 

   **dependencies:** `swiperReady`, `$refs` 

- `activityId` 

   **dependencies:** `$route` 

- `authorized` 

   **dependencies:** `activitySetData`, `activitySetData`, `isEditor`, `activitySetData`, `status` 

- `currentScreenIndex` 

   **dependencies:** `getIndex`, `activityData`, `currentSlide` 


## methods 

- `isEditor(activity)` 

- `getActivitySet()` 

- `getUserMetadata(userId)` 

- `getActivityMetadata()` 

- `getScreenMetadata(parentFolderId)` 

- `updateScreen(key, value)` 

- `getIndex(activityScreenIndex)` 

- `addScreen(name)` 

- `addBefore()` 

- `addAfter()` 

- `removeScreen()` 

- `moveRight()` 

- `moveLeft()` 

- `updateScreenName(name)` 

- `updateCurrentScreen()` 

  update the current screen. but make sure you don't ping the server
  too many times. 

- `updateMetadata()` 

- `updateMetadataName()` 

- `resetError()` 

