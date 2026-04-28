from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import io

app = FastAPI()

# CRITICAL: This allows your React app to talk to this Python server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global storage for the document text
document_store = {"content": ""}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if file.filename.endswith(".pdf"):
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            document_store["content"] = text
        else:
            document_store["content"] = content.decode("utf-8")
        
        return {"status": "success", "message": f"Successfully uploaded: {file.filename}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

class Question(BaseModel):
    prompt: str

@app.post("/ask")
async def ask_question(query: Question):
    context = document_store["content"]
    if not context:
        return {"answer": "No document found. Please upload a file first!"}
    
    # 1. Clean the prompt and the document
    user_query = query.prompt.lower().strip()
    
    # 2. Split the document into paragraphs (usually separated by double newlines)
    # If the document doesn't have double newlines, it will split by sentences.
    paragraphs = context.split('\n\n') if '\n\n' in context else context.split('.')
    
    # 3. Search for the paragraph that contains the user's keyword
    found_content = ""
    for para in paragraphs:
        if user_query in para.lower():
            found_content = para.strip()
            break # Stop at the first match
            
    if found_content:
        return {"answer": found_content}
    else:
        return {
            "answer": f"I couldn't find a section specifically about '{query.prompt}', but here is the start of the document: {context[:300]}..."
        }
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)