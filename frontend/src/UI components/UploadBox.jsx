function UploadBox({ onUpload }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onUpload(file);
      }
    };
  
    return (
      <div style={{ marginTop: "10px" }}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>
    );
  }
  
  export default UploadBox;