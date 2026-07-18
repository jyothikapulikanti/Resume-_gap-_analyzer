# Resume Gap Analyzer

An AI-powered web application that analyzes resumes, identifies skill gaps, and provides personalized recommendations to help job seekers improve their resumes for specific roles.

---

## Overview

Resume Gap Analyzer allows users to upload their resume in PDF format and receive an AI-generated analysis of their technical skills, missing competencies, strengths, and improvement suggestions. The application helps candidates understand how well their resume aligns with industry expectations.

---

## Features

### Resume Upload
- Upload resumes in PDF format
- Secure file handling
- Automatic text extraction

### AI Resume Analysis
- Extract technical skills
- Identify missing skills
- Highlight strengths and weaknesses
- Generate resume summary
- Suggest career improvements

### Personalized Recommendations
- Recommended technologies to learn
- Suggested certifications
- Project recommendations
- Resume writing tips

### Dashboard
- Resume analysis report
- Skills identified
- Missing skills
- AI-generated improvement suggestions

---

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### AI Integration
- OpenAI API

### Libraries
- pdf-parse
- Multer
- Axios
- Mongoose

---

## Project Architecture

```
Resume-Gap-Analyzer
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── uploads
│   ├── middleware
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Workflow

1. User uploads a resume.
2. Backend extracts text from the PDF.
3. Resume content is processed using the OpenAI API.
4. AI identifies:
   - Existing technical skills
   - Missing skills
   - Resume strengths
   - Areas for improvement
   - Recommended projects
   - Suggested certifications
5. Results are displayed in an interactive dashboard.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/Resume-Gap-Analyzer.git
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
```

Run the backend.

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

### Upload Resume

```
POST /api/upload
```

Uploads a PDF resume.

---

### Analyze Resume

```
POST /api/analyze
```

Processes the uploaded resume and returns AI-generated feedback.

---

### Get Analysis

```
GET /api/analysis/:id
```

Returns previously generated analysis.

---

## Sample Output

```
Skills Found
------------
Java
Spring Boot
React
MongoDB

Missing Skills
--------------
Docker
AWS
Redis

Recommendations
---------------
Learn Docker fundamentals
Build a cloud deployment project
Complete an AWS certification
Improve project descriptions
```

---

## Future Enhancements

- ATS Compatibility Score
- Job Description Matching
- Resume Version History
- Authentication using JWT
- Export Report as PDF
- Resume Comparison
- Interview Question Suggestions
- Learning Roadmap Generation

---

## Learning Outcomes

This project helped me gain practical experience in:

- Full Stack Development
- REST API Development
- MongoDB Integration
- PDF Processing
- AI Prompt Engineering
- OpenAI API Integration
- File Upload Handling
- React State Management

---

## Author

**Pulikanti Jyothika**

