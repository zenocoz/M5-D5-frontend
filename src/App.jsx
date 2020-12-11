import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import BackOffice from "./components/BackOffice";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route to="/" exact component={Home} />
        <Route to="/backoffice" exact component={BackOffice} />
      </Router>
    </div>
  );
}

export default App;
