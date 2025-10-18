import { useState } from "react";
import { Home } from "../ui";
import { DSAResponsiveNavbar } from "../components";
import "./App.css";

function App() {
  const [page, setPage] = useState(0);
  const renderPage = () => {
    switch (page) {
      case 0:
        return <Home />;
      case 1:
        return <h2>About me</h2>;
      case 2:
        return <h2>Portfolio</h2>;
      case 3:
        return <h2>Contacto</h2>;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <DSAResponsiveNavbar setPage={setPage} />
      <main className="main">{renderPage()}</main>
    </>
  );
}

export default App;
