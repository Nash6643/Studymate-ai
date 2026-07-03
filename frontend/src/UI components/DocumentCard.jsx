function DocumentCard({ doc }) {
    return (
      <div
        style={{
          padding: "10px",
          marginTop: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📄 {doc.name}
      </div>
    );
  }
  
  export default DocumentCard;