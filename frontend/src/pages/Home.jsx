import Sidebar from "../UI components/sidebar";
import Chatpage from "./Chatpage";

function Home({ selectedPdf, setSelectedPdf }) {
  return (
    <div className="home-container" style={{ display: "flex", height: "100vh" }}>
      <Sidebar setSelectedPdf={setSelectedPdf} />
      <Chatpage selectedPdf={selectedPdf} />
    </div>
  );
}

export default Home;