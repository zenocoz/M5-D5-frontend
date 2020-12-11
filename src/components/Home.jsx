
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SingleProduct from "./SingleProduct";
class Home extends React.Component {
  state = {
    products: [],
    loading: true,
    editProduct: {
      productObj: {},
      editCounter: 0,
    },
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

  componentDidMount = () => {
    this.fetchProducts();
  };
  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            {this.state.products.map((product, index) => (
              <Col md={4} key={index}>
                <SingleProduct
                  productObj={product}
                  history={this.props.history}
                  editProduct={() =>
                    this.setState({
                      editProduct: {
                        productObj: product,
                        editCounter: this.state.editProduct.editCounter + 1,
                      },
                    })
                  }
                />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
