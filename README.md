# art-gallery
Technical challenge for openKit

This React project was created using Vite and connected to supabase for the backend.

To get started go to the project directory and run 

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.


## Supabase details

The following database tables are required:

| Field            | Type      |
| ---------------- | --------- |
| id               | BIGINT    |
| harvard_ref      | VARCHAR   |
| title            | VARCHAR   |
| artist           | VARCHAR   |
| image_src        | VARCHAR   |
| year             | VARCHAR   |
| created_at       | timestamp |

| Field            | Type      |
| ---------------- | --------- |
| user_id          | UUID      |
| artwork_id       | BIGINT    |
