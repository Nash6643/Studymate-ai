import { useState } from "react";
import UploadBox from "./UploadBox";
import DocumentCard from "./DocumentCard";

function Sidebar({ selectedPdf, setSelectedPdf }) {
  const [documents, setDocuments] = useState([]);

  const handleAddDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Key matches request.files['file'] in Flask

    try {
      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("UPLOAD RESPONSE:", data);

      if (!res.ok) {
        console.error("Upload failed:", data.error);
        return;
      }

      const newDoc = {
        id: Date.now(),
        name: file.name,
      };

      setDocuments((prev) => [...prev, newDoc]);

      // Set global reference object automatically upon a successful upload
      setSelectedPdf({
        filename: data.filename,
      });

    } catch (err) {
      console.error("Network upload error:", err);
    }
  };

  return (
    <div className="sidebar" style={{ width: "300px", borderRight: "1px solid #ddd", padding: "10px" }}>
      <h3>Documents</h3>
      <UploadBox onUpload={handleAddDocument} />
      
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {documents.map((doc) => {
          // Check if this specific document card matches the currently selected active PDF
          const isActive = selectedPdf && selectedPdf.filename === doc.name;

          return (
            <div 
              key={doc.id} 
              onClick={() => {
                setSelectedPdf({ filename: doc.name });
                console.log("Switched active chat target to:", doc.name);
              }}
              style={{ 
                cursor: "pointer",
                borderRadius: "6px",
                transition: "background-color 0.2s ease",
                backgroundColor: isActive ? "#e6f2ff" : "transparent", // Highlight active selection
                border: isActive ? "1px solid #b3d7ff" : "1px solid transparent",
              }}
            >
              <DocumentCard doc={doc} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;