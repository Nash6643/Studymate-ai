# StudyMate AI 📚🤖

StudyMate AI is a full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload academic PDF notes, lectures, or reference guides and have contextual, multi-turn conversations about the content. Powered by a high-performance vector search database layer and the Gemini API, it provides highly accurate answers constrained strictly to the uploaded document context.

---

## 🚀 Features

* **PDF Upload & Processing:** Multi-part file handling saves local PDFs and immediately passes them to an extraction and chunking pipeline.
* **Vector Semantic Search:** Text chunks are embedded and indexed into an in-memory FAISS vector storage database for efficient semantic matching.
* **Context-Isolated AI Chat:** Leverages `gemini-2.5-flash` to generate detailed, structured responses derived exclusively from the retrieved document context.
* **Dynamic Document Selection:** Sidebar document management lets users seamlessly switch between multiple uploaded files on the fly.
* **Clean, Scannable UI:** Custom styled chat bubble interface built using clean, native React styles with preserved text layout formatting.

---

## 📂 Project Architecture

```text
Projects/
├── backend/
│   ├── uploads/            # Temporary disk storage for uploaded PDFs
│   ├── app.py              # Flask Application Server & RAG logic
│   ├── pdf_utils.py        # PDF text extraction utilities
│   ├── text_utils.py       # Custom text chunking algorithms
│   ├── embedding_utils.py  # GenAI text embedding engine
│   ├── vector_store.py     # FAISS/Vector manipulation wrapper
│   └── .env                # Backend secrets (API Keys)
│
└── frontend/
    ├── src/
    │   ├── pages/          # Frontpage, Home, and Main Chatpage components
    │   ├── UI components/  # Navbars, Sidebar, UploadBox, and Chat inputs
    │   ├── App.jsx         # Component routing configuration
    │   └── main.jsx        # App entry point
    ├── .env                # Frontend environment configuration
    └── package.json        # Node.js dependencies
