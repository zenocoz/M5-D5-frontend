
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home"
import BackOffice from "./components/BackOffice"
import ProductDetails from "./components/ProductDetails"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/backoffice" exact component={BackOffice} />
        <Route path="/details/:id" exact component={ProductDetails} />
      </Router>
    </div>
  )
}

export default App

