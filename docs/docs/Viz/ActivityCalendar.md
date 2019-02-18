# activity-calendar 

## props 

- `activity` ***Array*** (*optional*) 

- `width` ***Number*** (*optional*) 

- `t-min` ***Object*** (*optional*) 

- `t-max` ***Object*** (*optional*) 

- `idx` ***Number*** (*optional*) 

- `height` ***Number*** (*optional*) `default: 50` 

- `padding` ***Number*** (*optional*) `default: 5` 

- `color` ***String*** (*optional*) `default: 'red'` 

- `role` ***String*** (*optional*) `default: 'data'` 

- `title` ***String*** (*optional*) `default: ''` 

## data 

- `brush` 

**initial value:** `null` 

## computed properties 

- `xScale` 

   **dependencies:** `getXScale`, `getXScale` 

- `yTrans` 

   **dependencies:** `idx`, `height` 


## events 

- `setRange` 

## methods 

- `getXScale()` 

- `drawAxis()` 

- `drawDots()` 

- `brushed()` 

- `drawScrub()` 

- `redrawScrub(min, max)` 

