import { useState } from "react";
import { Home, Portfolio, AboutMe, Contact } from "../ui";
import { DSAResponsiveNavbar } from "../components";
import "./App.css";

function App() {
  const [page, setPage] = useState(0);
  const renderPage = () => {
    switch (page) {
      case 0:
        return <Home />;
      case 1:
        return <AboutMe />;
      case 2:
        return <Portfolio />;
      case 3:
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <div className="global-blob-container">
        <div className="global-blob global-blob-1"></div>
        <div className="global-blob global-blob-2"></div>
        <div className="global-blob global-blob-3"></div>
        <div className="global-blob global-blob-4"></div>
        <div className="global-blob global-blob-5"></div>
      </div>

      {/* Tu aplicación */}
      <DSAResponsiveNavbar setPage={setPage} />
      <main className="main">{renderPage()}</main>
    </>
  );
}

export default App;
