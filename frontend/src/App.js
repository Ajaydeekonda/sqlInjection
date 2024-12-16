import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form"; 
import ErrorPage from "./components/ErrorPage";
import ViewSource from "./components/ViewSource.";

function App() {
  

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/viewsource" element={<ViewSource/>} />
      </Routes>
    </Router>
  );
}

export default App;




