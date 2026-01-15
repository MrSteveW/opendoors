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

### bookings table

| Field       | Type                    |
| ----------- | ----------------------- |
| id          | Primary Key             |
| date        | Date                    |
| class_id    | FK references classes   |
| producer_id | FK references producers |
| time_id     | FK references times     |
| topic       | Text                    |

## Features

- [x] Next.JS with PostgreSQL database
- [x] Calendar by FullCalendar
- [x] Authentication and Authorization by Clerk

## Additional libraries used

- pg
- Clerk
- Lucide icons
- Motion
