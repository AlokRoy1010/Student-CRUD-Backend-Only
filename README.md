# Student CRUD Backend (Node.js + Express + MongoDB)

## Requirements Met
- Node.js + Express.js + MongoDB
- Database: `studentDB`
- Collection: `students`

### Student Fields
- name
- email
- age
- department

### APIs
| Method | Route            | Description              |
|--------|------------------|--------------------------|
| POST   | /students        | নতুন Student যোগ        |
| GET    | /students        | সকল Student দেখা        |
| GET    | /students/:id    | নির্দিষ্ট Student দেখা  |

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure MongoDB is running.

3. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

4. Server will run at: `http://localhost:5000`

## Test with Postman / Thunder Client

**POST** `http://localhost:5000/students`
```json
{
  "name": "Rahim Khan",
  "email": "rahim@gmail.com",
  "age": 22,
  "department": "CSE"
}
```

**GET** `http://localhost:5000/students`

**GET** `http://localhost:5000/students/:id`
# Student-CRUD-Backend-Only
