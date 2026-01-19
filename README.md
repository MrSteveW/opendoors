# Opendoors v4 booking app

## Tables

### classes table

| Field | Type        |
| ----- | ----------- |
| id    | Primary Key |
| name  | String      |

### producers table

| Field | Type        |
| ----- | ----------- |
| id    | Primary Key |
| name  | String      |

### times table

| Field | Type        |
| ----- | ----------- |
| id    | Primary Key |
| name  | String      |
| order | Integer     |

### events table

| Field       | Type                    |
| ----------- | ----------------------- |
| id          | Primary Key             |
| date        | Date                    |
| class_id    | FK references classes   |
| producer_id | FK references producers |
| time_id     | FK references times     |
| topic       | Text                    |

### Zustand state

- [x] mode ('Create', 'Edit', 'View')
- [x] selectedDate
- [x] selectedEvent
- [x] unavailableTimes

## Features

- [x] Next.JS with PostgreSQL database
- [x] Calendar by FullCalendar
- [x] Authentication and Authorization by Clerk

## Additional libraries used

- pg database interface
- Zustand state management
- Clerk
- Lucide icons
- Motion

## Attributions

[Headphones by juicy_fish on Freepik](https://www.freepik.com/free-vector/ear-headphones-music-symbol_37409070.htm#fromView=search&page=1&position=16&uuid=74735ec4-08ef-400e-aa22-f83fe92436f8&query=headphone+icon)  
[Linotype Atomatic Font](https://legionfonts.com/fonts/linotype-atomatic)
