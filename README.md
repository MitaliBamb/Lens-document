# Lens: AI-Native Document Analyzer

I developed this project, an AI-native document analyzer designed to bridge the gap between static data and actionable insights. Using a Python-FastAPI backend and a React frontend, the system allows users to upload complex documents like PDFs and interact with them in real-time.

## Features
- **FastAPI Backend**: Built for high-performance AI orchestration.
- **React Frontend**: Modern, responsive UI designed for AI interactions.
- **RAG Simulation**: Demonstrates how user queries are processed and returned with source citations.

## Setup Instructions

### 1. Backend (Python)
- Navigate to the `backend` folder.
- Install dependencies: `pip install -r requirements.txt`.
- Run the server: `python main.py`.
- The server will run at `http://localhost:8000`.

### 2. Frontend (React)
- Create a new React project (e.g., `npx create-react-app frontend` or use Vite).
- Install Axios: `npm install axios`.
- Ensure Tailwind CSS is installed in your project for the styling to work.
- Use this prompt: install npm
                   run dev npm
- it will give local host link clinck on it.

## How it Works
- **Upload:** Users select a file which is transmitted via Multipart/Form-Data to the FastAPI endpoint.
- **Parsing:** The Python backend uses PyPDF2 to read the binary content and convert it into a searchable string buffer.
- **Querying:** When a user asks a question (e.g., "What is the conclusion?"), the backend splits the document into semantic paragraphs.
- **Contextual Retrieval:** The system performs a case-insensitive search and returns the specific paragraph containing the answer,rather than just a confirmation message.

*Note-* If erroe is coming because you dont have an proper react file use this comand:- npm install vite @vitejs/plugin-react react react-dom axios. then delete all the extra double file which is installed after this prompt.
