import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import SingleProduct from "./SingleProduct";
class Home extends React.Component {
  state = {
    products: [],
    loading: true,
    submitCounter: 0,
  };

  fetchProducts = async () => {
    this.setState({ loading: true });
    try {
      let response = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT}/products`
      );

      let products = await response.json();
      console.log(products);

      if (response.ok) {
        this.setState({ products, loading: false });
      } else {
        alert("something went wrong");
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteFetch = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT}/products/` + id,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("Product is deleted");
        this.setState({ submitCounter: this.state.submitCounter + 1 });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchProducts();
  };
  componentDidUpdate = (previousProps, previousState) => {
    if (previousState.submitCounter !== this.state.submitCounter) {
      this.fetchProducts();
    }
  };
  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            {this.state.products.map((product, index) => (
              <Col md={4} key={index} className="my-5">
                {this.state.loading ? (
                  <Spinner animation="border" variant="success" />
                ) : (
                  <SingleProduct
                    productObj={product}
                    history={this.props.history}
                    editProduct={() => this.props.product(product)}
                    deleteProduct={() => {
                      this.deleteFetch(product.ID);
                    }}
                  />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
