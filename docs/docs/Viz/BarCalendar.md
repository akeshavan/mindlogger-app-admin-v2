# bar-calendar 

## props 

- `data` ***Array*** (*optional*) 

- `x-name` ***String*** (*optional*) 

- `y-name` ***String*** (*optional*) 

- `height` ***Number*** (*optional*) `default: 200` 

- `padding` ***Number*** (*optional*) `default: 25` 

- `color` ***String*** (*optional*) `default: 'red'` 

- `title` ***String*** (*optional*) `default: ''` 

## data 

- `width` 

**initial value:** `0` 

- `tip` 

**initial value:** `null` 

## computed properties 

- `xScale` 

   **dependencies:** `getXScale`, `getXScale` 

- `yScale` 

   **dependencies:** `getYScale`, `getYScale` 

- `dateRange` 

   **dependencies:** `getDateRange` 

- `yValueRange` 

   **dependencies:** `data`, `yName` 


## methods 

- `handleResize()` 

- `getDateRange()` 

- `getXScale()` 

- `getYScale()` 

- `drawAxis()` 

- `drawDots()` 

