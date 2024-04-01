# S3-Clone

S3-Clone is a simple file storage application built using Node.js, Express.js, and MongoDB. It provides endpoints for users to manage buckets and upload/download files.

## Features

- **User Authentication:** Users can register, login, and logout. Authentication is handled using JWT tokens.
- **Bucket Management:** Users can create, list, and delete buckets to organize their files.
- **File Management:** Users can upload, list, update, and delete files within their buckets.

## Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/s3-clone.git
```
### Install dependencies:

```bash
cd s3-clone
npm install
```

### Run the application:
```bash
npm start
```

## API Documentation

The API documentation is generated using Swagger and can be accessed at `/api-docs`.

### Endpoints

#### Authentication:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login with email and password.
- `POST /auth/logout`: Logout the current user.
- `POST /auth/logoutall`: Logout from all sessions.

#### Bucket Management:

- `POST /bucket/add`: Add a new bucket.
- `GET /bucket/list/{page}/{pageSize}`: Retrieve a list of buckets.
- `GET /bucket/{bucketId}`: Retrieve a bucket by ID.
- `PUT /update/:bucketId`: Update a specific bucket.
- `DELETE /bucket/delete/{bucketId}`: Delete a bucket.

#### File Management:

- `POST /file/{bucketId}/files`: Upload a file to a specific bucket.
- `GET /file/list/{page}/{pageSize}`: Retrieve a list of files.
- `GET /file/{fileId}`: Retrieve a specific file.
- `PUT /file/update/{bucketId}/{fileId}`: Update a specific file.
- `DELETE /file/delete/{fileId}`: Delete a specific file.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT
- Bcrypt
- Multer
- dotenv
- Swagger

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
