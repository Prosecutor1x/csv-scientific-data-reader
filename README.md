Here's a detailed `README.md` for your project:

---

# File Upload & Metadata API with Next.js and Express

This project demonstrates a full-stack application that allows users to upload CSV files, analyze them, store metadata in a PostgreSQL database, and serve the files via Firebase Storage. The frontend is built using **Next.js** (React) and styled with **Tailwind CSS**, while the backend is built using **Express.js** with **Prisma ORM** for PostgreSQL integration.

## Features

- **File Upload**: Users can upload CSV files.
- **CSV Analysis**: The uploaded CSV files are parsed to extract metadata such as row count and column names.
- **File Storage**: Files are stored in Firebase Storage for access.
- **Metadata Storage**: Metadata (filename, row count, column names, file URL) is stored in PostgreSQL using Prisma.
- **Frontend Display**: The uploaded files and their metadata are displayed on a web interface built with Next.js and styled using Tailwind CSS.

## Technologies Used

- **Frontend**: 
  - Next.js (React)
  - Tailwind CSS
  - Axios (for making API requests)
  
- **Backend**: 
  - Express.js
  - Multer (for file handling)
  - Firebase Storage
  - PostgreSQL (with Prisma ORM)
  
- **Deployment**: 
  - Firebase (for file storage)
  - PostgreSQL on Aiven (for database management)

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

#### Backend (Express)

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

#### Frontend (Next.js)

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in both the frontend and backend directories to store sensitive information such as database credentials and API keys.

#### Backend `.env` Example

```bash
DATABASE_URL=postgres:example-url
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
```

#### Frontend `.env.local` Example

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Configure Prisma

1. Open `prisma/schema.prisma` and set up the database connection string:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Run Prisma migrations to create the necessary tables:

```bash
cd backend
npx prisma migrate dev
```

### 5. Running the Application

#### Backend (Express API)

In the backend folder, start the Express server:

```bash
cd backend
npm run dev
```

This will run the backend API on `http://localhost:5000`.

#### Frontend (Next.js)

In the frontend folder, start the Next.js development server:

```bash
cd frontend
npm run dev
```

This will run the frontend on `http://localhost:3000`.

### 6. File Upload Flow

1. **Upload CSV**: On the frontend, navigate to the file upload section. Select a CSV file and upload it.
2. **Backend Processing**: The backend receives the file, processes it to extract metadata (row count, column names), stores the file in Firebase Storage, and saves the metadata in PostgreSQL.
3. **Display Data**: Once the file is uploaded, the metadata is stored and shown on the frontend, including a link to the uploaded file in Firebase Storage.

## API Endpoints

### `POST /api/upload`
- **Description**: Uploads a CSV file, analyzes its content, stores it in Firebase Storage, and saves metadata in PostgreSQL.
- **Request**: 
  - Form-data: `file` (CSV file)
- **Response**: 
  - JSON with success message and file metadata.

### `GET /api/files`
- **Description**: Fetches the list of all uploaded files with metadata (filename, upload date, row count, columns, and file URL).
- **Response**: 
  - JSON with an array of files and their metadata.

## Project Structure

```bash
/my-next-app
  /backend
    /node_modules
    /prisma
      schema.prisma
    /src
      /controllers
        fileController.js
      /routes
        fileRoutes.js
      /services
        fileParserService.js
        firebaseService.js
      app.js
      server.js
    .env
    package.json
  /frontend
    /node_modules
    /components
      FileList.tsx
    /pages
      index.tsx
    /public
    /styles
      globals.css
    tailwind.config.js
    postcss.config.js
    .env.local
    package.json
  .gitignore
  README.md
```

## Database Schema (PostgreSQL)

### `File` Table

```sql
CREATE TABLE "File" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "filename" TEXT NOT NULL,
  "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "rowCount" INTEGER NOT NULL,
  "columns" TEXT[] NOT NULL,
  "fileUrl" TEXT NOT NULL
);
```

## Troubleshooting

- **CORS Issues**: Ensure that your API allows requests from your frontend domain (`http://localhost:3000`) via the correct CORS configuration.
- **Database Connection**: Double-check the `DATABASE_URL` in your `.env` file if you're encountering database connection errors.
- **Firebase Storage**: Make sure your Firebase credentials are correctly set up in the `.env` file, and that your Firebase project is properly configured.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust any environment details or steps to match your actual configuration. This `README.md` should provide a comprehensive guide for setting up and running your full-stack application!
 
