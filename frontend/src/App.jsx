import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage"; 
import Home from "./pages/Home";

function App() {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route 
          path="/home" 
          element={
            <Home 
              selectedPdf={selectedPdf} 
              setSelectedPdf={setSelectedPdf} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;