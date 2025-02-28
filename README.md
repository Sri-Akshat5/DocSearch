# DocSearch

DocSearch is a powerful document search application designed to efficiently index and retrieve documents using advanced search algorithms.

## 🚀 Features

🔍 Intelligent Document Search: Quickly find relevant documents based on keywords.

🛠 Backend: Built with Node.js and Express.

📄 Database: Uses MySQL for efficient data storage and retrieval.

🌐 Frontend: Developed with React.js and TailwindCSS for a clean UI.

🔐 Authentication: Secure user login and registration system.

☁️ Deployment: Hosted on Render (Backend) and Vercel (Frontend).

## 🚀 Installation & Setup
### 1️⃣ Backend Setup
```bash
cd intelligent-doc-search_backend
npm install, mysql12
npm start
```
### 2️⃣ Frontend Setup
```bash
cd intelligent-doc-search
npm install
npm run dev
```
## 🔹 Frontend Deployment(Not Connected with backend)
[https://doc-search-eta.vercel.app/](https://doc-search-eta.vercel.app/)


## 🔗 API Endpoints
```
| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/login`         | User authentication    |
| POST   | `/register`      | Register new user      |
| GET    | `/documents`     | Fetch documents        |
| GET    | `/search?q=...`  | Search documents       |
```

## 🎯 Future Enhancements

- AI-powered search optimization.

- OCR integration for scanned documents.

- Multi-user collaboration features.

