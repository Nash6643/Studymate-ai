# 📚 StudyMate AI

**An AI-powered study assistant that turns your academic PDFs into interactive, context-aware conversations.**

StudyMate AI is a full-stack Retrieval-Augmented Generation (RAG) application designed to help students learn more effectively from their own academic materials. Upload lecture notes, course PDFs, or reference guides, and ask questions to receive contextual answers grounded in the content of your documents.

Built with **React, Flask, FAISS, and Google's Gemini API**, StudyMate AI combines semantic search with generative AI to deliver relevant explanations while keeping responses focused on the uploaded study materials.

---

## ✨ Features

- **📄 PDF Upload & Processing** — Upload academic PDFs and automatically extract, process, and split their content into searchable text chunks.
- **🔍 Semantic Search** — Generate text embeddings and use FAISS for efficient similarity-based retrieval of relevant document passages.
- **🤖 Context-Aware AI Chat** — Powered by Google's `gemini-2.5-flash` model to generate structured answers based on retrieved document context.
- **📚 Multi-Document Management** — Upload multiple documents and switch between them directly through the sidebar.
- **💬 Interactive Conversations** — Ask follow-up questions and explore complex topics through multi-turn conversations.
- **🎨 Clean User Interface** — A React-based chat interface with custom styling, readable message layouts, and dedicated document management components.
- **🧩 Modular Backend Architecture** — Separate modules for PDF extraction, text chunking, embeddings, vector storage, and application logic.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, CSS |
| Backend | Python, Flask |
| AI Model | Google Gemini `gemini-2.5-flash` |
| Embeddings | Google GenAI embedding API |
| Vector Search | FAISS |
| Document Processing | PDF text extraction utilities |
| Configuration | Environment variables (`.env`) |

## 🏗️ Architecture

StudyMate AI follows a precise modular full-stack architecture that separates the user interface, API layer, document processing pipeline, and semantic retrieval system.

```text
                  ┌────────────────────────┐
                  │      React Frontend    │
                  │  Upload • Chat • Docs  │
                  └────────────┬───────────┘
                               │ HTTP Requests
                               ▼
                  ┌────────────────────────┐
                  │     Flask Backend       │
                  │      API Endpoints      │
                  └────────────┬───────────┘
                               │
                  ┌────────────▼───────────┐
                  │   PDF Processing       │
                  │ Extraction & Chunking   │
                  └────────────┬───────────┘
                               │
                  ┌────────────▼───────────┐
                  │  Embedding Generation  │
                  │    Vector Encoding     │
                  └────────────┬───────────┘
                               │
                  ┌────────────▼───────────┐
                  │     FAISS Index        │
                  │   Semantic Retrieval   │
                  └────────────┬───────────┘
                               │
                  ┌────────────▼───────────┐
                  │   Gemini AI Model      │
                  │ Context-Based Answers  │
                  └────────────────────────┘
```

### Project Structure

```text
StudyMate-AI/
├── backend/
│   ├── uploads/              # Uploaded PDF files
│   ├── app.py                # Flask server and RAG orchestration
│   ├── pdf_utils.py          # PDF text extraction
│   ├── text_utils.py         # Text cleaning and chunking
│   ├── embedding_utils.py    # Embedding generation
│   ├── vector_store.py       # FAISS index and retrieval operations
│   ├── .env                  # Backend environment variables
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # Application pages
│   │   ├── UI components/    # Reusable UI components
│   │   ├── App.jsx           # Application routing
│   │   └── main.jsx          # React entry point
│   ├── .env                  # Frontend environment variables
│   └── package.json          # Node.js dependencies
│
└── README.md
```

*Note: The structure above assumes a backend `requirements.txt` file exists. Adjust the directory names to match the actual repository.*

## ⚙️ How It Works

StudyMate AI uses a Retrieval-Augmented Generation pipeline to connect document search with AI-generated responses.

1. **Document Upload:** The user uploads a PDF through the React interface.
2. **Text Extraction:** The Flask backend extracts readable text from the uploaded document.
3. **Text Chunking:** The extracted content is divided into smaller chunks to improve retrieval relevance.
4. **Embedding Generation:** Each chunk is converted into a numerical vector using an embedding model.
5. **Vector Indexing:** The vectors are stored in a FAISS index for similarity-based search.
6. **Context Retrieval:** When the user asks a question, the system retrieves relevant document chunks.
7. **Answer Generation:** The retrieved context is passed to Gemini, which generates an answer grounded in the available document content.
8. **Interactive Follow-ups:** Users can continue asking related questions to explore their study materials.

## 🚀 Getting Started

Follow these instructions to run StudyMate AI locally.

### Prerequisites

Make sure you have the following installed:

- Python 3.10 or later
- Node.js and npm
- A Google Gemini API key
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/StudyMate-AI.git
cd StudyMate-AI
```

Replace `YOUR_USERNAME` with your GitHub username and update the repository URL if necessary.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment.

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` directory and configure your API key using the variable name expected by your application.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> Make sure the environment variable name matches the one referenced in your backend code.

Start the Flask server:

```bash
python app.py
```

### 3. Configure the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

If your frontend requires an API base URL, configure it in `frontend/.env` using the variable name expected by your application.

For example, with a Vite-based frontend:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in your terminal to access the application.

*The commands and environment variable names may need adjustment depending on your actual configuration.*

## 🔐 Environment Variables

Keep API keys and other secrets out of source control.

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Authenticates requests to the Gemini API |
| Frontend API URL variable | Configures the backend endpoint used by the frontend |

Never commit your `.env` files or expose private API keys in client-side code. Add them to `.gitignore`:

```gitignore
# Environment variables
.env
.env.*
!.env.example

# Python
__pycache__/
*.py[cod]
venv/

# Uploaded documents and generated data
backend/uploads/*
!backend/uploads/.gitkeep

# Frontend dependencies and build output
frontend/node_modules/
frontend/dist/
```

If you want to document required environment variables, create `.env.example` files containing placeholder values rather than real credentials.

## 🧠 Why Retrieval-Augmented Generation?

Traditional AI chatbots may generate answers that are not specific to a student's course material. StudyMate AI addresses this limitation by retrieving relevant passages from uploaded documents before generating a response.

This approach helps to:

- Keep explanations relevant to the selected study material.
- Make it easier to explore lengthy lecture notes.
- Support follow-up questions about specific concepts.
- Reduce reliance on information unrelated to the uploaded documents.

**Important:** Retrieval-grounded generation does not guarantee perfect accuracy. Answers can still be incomplete or incorrect if the source material is ambiguous or relevant passages are not retrieved.

## 🔮 Future Improvements

Potential enhancements for future versions include:

- [ ] Persistent vector storage across application restarts.
- [ ] Source citations linking answers to relevant PDF pages.
- [ ] Streaming AI responses for a more responsive chat experience.
- [ ] Improved conversation history and session management.
- [ ] Support for additional document formats.
- [ ] Configurable chunking and retrieval parameters.
- [ ] Docker-based deployment.
- [ ] Automated backend and frontend tests.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request describing your improvements.

## 📄 License

No license has been specified yet. If you intend to distribute this project publicly, consider adding a `LICENSE` file that defines how others may use, modify, and distribute your code.

---

**StudyMate AI** — Making academic learning more interactive, accessible, and context-aware. 📚🤖
