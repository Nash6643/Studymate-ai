from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from pdf_utils import extract_text_from_pdf
from text_utils import chunk_text
from embedding_utils import embed_text
from vector_store import VectorStore

from dotenv import load_dotenv
from google import genai

# ----------------------------
# Setup & Configuration
# ----------------------------

app = Flask(__name__)

# Configures CORS to allow frontend connections on other ports (e.g., 5173)
CORS(app, resources={r"/*": {"origins": "*"}})

# Tells dotenv to look at the parent directory for the .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Use absolute path to avoid directory mismatch issues
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# In-memory storage for vector chunks
pdf_store = {}

def process_pdf_file(file_path, filename):
    """Helper function to process a PDF and save it into the in-memory vector store."""
    print(f"Processing PDF: {filename}...")
    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)
    
    if not chunks:
        return False

    embeddings = []
    for chunk in chunks:
        embeddings.append(embed_text(chunk))

    dimension = len(embeddings[0])
    store = VectorStore(dimension)
    store.add_embeddings(embeddings, chunks)

    pdf_store[filename] = {
        "chunks": chunks,
        "vector_store": store
    }
    return True

# ----------------------------
# Routes
# ----------------------------

@app.route("/upload", methods=["POST"])
def upload_file():
    """Endpoint to handle multi-part file uploads from Sidebar.jsx"""
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file payload detected in the request"}), 400
            
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No selected filename"}), 400
            
        if file and file.filename.lower().endswith('.pdf'):
            filename = file.filename
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            
            # Save file to server disk directory
            file.save(file_path)
            
            # Index/Process the PDF into the FAISS memory layer
            success = process_pdf_file(file_path, filename)
            
            if not success:
                return jsonify({"error": "Failed to extract content or process text tokens from this PDF."}), 500
                
            # Return JSON signature expected by Sidebar.jsx (data.filename)
            return jsonify({
                "message": "File successfully uploaded and indexed!",
                "filename": filename
            }), 200
        else:
            return jsonify({"error": "Invalid file format. Only PDFs are allowed."}), 400
            
    except Exception as e:
        print(f"Upload Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/ask", methods=["POST"])
def ask_question():
    """Endpoint to query specific indexed PDFs from Chatpage.jsx"""
    try:
        # ----------------------------
        # 1. Get JSON request
        # ----------------------------
        data = request.get_json()
        print("\n========== NEW REQUEST ==========")
        print("Incoming Data:", data)

        if not data:
            return jsonify({"error": "No data provided"}), 400

        question = data.get("question")
        filename = data.get("filename")

        print("Question:", question)
        print("Filename:", filename)

        if not question:
            return jsonify({"error": "Question is required"}), 400

        if not filename:
            return jsonify({"error": "Filename is required"}), 400

        # ----------------------------
        # 2. Check if PDF is indexed
        # ----------------------------
        if filename not in pdf_store:
            print(f"{filename} not found in memory.")

            file_path = os.path.join(UPLOAD_FOLDER, filename)

            if os.path.exists(file_path):
                print(f"Re-indexing {filename}...")
                success = process_pdf_file(file_path, filename)

                if not success:
                    return jsonify({
                        "error": "Failed to process the uploaded PDF."
                    }), 500
            else:
                return jsonify({
                    "error": f"PDF '{filename}' not found."
                }), 404

        # ----------------------------
        # 3. Load vector store
        # ----------------------------
        store = pdf_store[filename]["vector_store"]
        print("Vector store loaded.")

        # ----------------------------
        # 4. Embed question
        # ----------------------------
        print("Generating embedding...")
        query_embedding = embed_text(question)
        print("Embedding generated.")

        # ----------------------------
        # 5. Search FAISS
        # ----------------------------
        print("Searching vector database...")
        retrieved_chunks = store.search(
            query_embedding,
            top_k=3
        )

        print("Retrieved Chunks:")
        print(retrieved_chunks)

        if len(retrieved_chunks) == 0:
            return jsonify({
                "answer": "I couldn't find any relevant information in the PDF."
            })

        # ----------------------------
        # 6. Build context
        # ----------------------------
        context = "\n\n".join(retrieved_chunks)

        prompt = f"""
You are a helpful AI assistant.

Answer ONLY using the context below.

If the answer is not in the context, say:

"I don't know based on the document."

Context:
{context}

Question:
{question}
"""

        # ----------------------------
        # 7. Ask Gemini
        # ----------------------------
        print("Calling Gemini...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        print("Gemini Response:")
        print(response.text)

        # ----------------------------
        # 8. Return response
        # ----------------------------
        return jsonify({
            "question": question,
            "answer": response.text,
            "context": retrieved_chunks
        })

    except Exception as e:
        import traceback

        print("\n========== ERROR ==========")
        traceback.print_exc()
        print("===========================\n")

        return jsonify({
            "error": str(e)
        }), 500

# ----------------------------
# Run server
# ----------------------------

if __name__ == "__main__":
    app.run(debug=True, port=5001)