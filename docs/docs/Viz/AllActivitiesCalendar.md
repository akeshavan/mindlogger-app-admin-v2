# all-activities-calendar 

## props 

- `id` ***String*** (*required*) 

- `data` ***Array*** (*optional*) 

- `is-boss` ***Boolean*** (*optional*) `default: false` 

  if this is the boss calendar,
  it calculates its total date range and shares it to the parent.
  If its not the boss, then it needs a date range as a prop. 

- `date-range` ***Array*** (*optional*) 

  override the data's date range for the scrubber. 

- `filter-date-range` ***Array*** (*optional*) 

  filter date range for the non-scrubber components. 

- `color-arr` ***Array*** (*optional*) 

  optional color array 

## data 

- `width` 

**initial value:** `0` 

- `height` 

**initial value:** `0` 

- `tMin` 

**initial value:** `null` 

- `tMax` 

**initial value:** `null` 

- `sMin` 

**initial value:** `null` 

- `sMax` 

**initial value:** `null` 

- `axisHeight` 

**initial value:** `50` 

- `padding` 

**initial value:** `15` 

## computed properties 

- `dataFlat` 

  for the time scrubber, flatten all the data as a reference. 

   **dependencies:** `data` 


## events 

- `setGlobalDateRange` 

- `setFilterDateRange` 

## methods 

- `handleResize()` 

- `getWidth()` 

- `setHeight(h)` 

- `getDateRange()` 

- `getColor(i)` 

- `setNewRange(newRange)` 

