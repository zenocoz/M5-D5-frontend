import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import BackOffice from "./components/BackOffice";
import ProductDetails from "./components/ProductDetails";

class App extends React.Component {
  state = {
    product: {},
  };
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar clearProduct={() => this.setState({ product: {} })} />
          <Route
            path="/"
            exact
            render={(props) => (
              <Home
                {...props}
                product={(prod) => this.setState({ product: prod })}
              />
            )}
          />
          <Route
            path="/backoffice"
            exact
            render={(props) => (
              <BackOffice
                {...props}
                product={this.state.product}
                clearProduct={() => this.setState({ product: {} })}
              />
            )}
          />
          <Route path="/details/:id" exact component={ProductDetails} />
        </Router>
      </div>
    );
  }
}

export default App;
