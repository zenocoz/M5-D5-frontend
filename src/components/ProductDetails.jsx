import React from "react";
import { Row, Container, Card, Col, Badge } from "react-bootstrap";

class ProductDetails extends React.Component {
  state = {
    details: {},
  };

  fetchProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT}/products/` + id
      );
      if (response.ok) {
        const details = await response.json();
        console.log(details[0]);
        this.setState({ details: details[0] });
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    let productId = this.props.match.params.id;
    this.fetchProduct(productId);
  }

  render() {
    return (
      <Container>
        {this.state.details && (
          <div>
            <Row className="my-2">
              <Col md={3}>
                <img
                  src={this.state.details.imageUrl}
                  alt="product"
                  className="img-fluid"
                />
              </Col>
              <Col md={9}>
                <Card>
                  <Card.Body>
                    <Card.Title>{this.state.details.name}</Card.Title>
                    <Card.Text>{this.state.details.description}</Card.Text>
                    <Card.Text>{this.state.details.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
        {!this.state.details && <h1>LOADING</h1>}
      </Container>
    );
  }
}

export default ProductDetails;
