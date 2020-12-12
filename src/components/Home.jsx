import React from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Jumbotron,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import SingleProduct from "./SingleProduct";
class Home extends React.Component {
  state = {
    products: [],
    loading: true,
    submitCounter: 0,
    searchProduct: "",
  };

  HandleSearchQuery = (query) => {
    if (query.length > 0) {
      this.setState({ searchProduct: query });
    } else {
      this.setState({ searchProduct: "" });
    }
  };

  fetchProducts = async () => {
    this.setState({ loading: true });
    let url =
      this.state.searchProduct.length > 0
        ? `http://localhost:${process.env.REACT_APP_PORT}/products?category=${this.state.searchProduct}`
        : `http://localhost:${process.env.REACT_APP_PORT}/products`;
    try {
      let response = await fetch(url);

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
    if (previousState.searchProduct !== this.state.searchProduct) {
      this.fetchProducts();
    }
  };
  render() {
    return (
      <>
        <Jumbotron
          fluid
          style={{
            backgroundImage: `url(https://cdn.wallpapersafari.com/75/0/sv3Zjq.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPositionY: "60%",
          }}
        >
          <Row>
            <Col
              md={{ span: 8, offset: 2 }}
              style={{
                background: "rgba(0,0,0,0.6)",
                minHeight: "400px",
                borderRadius: "25px",
              }}
            >
              <h1 className="text-light mt-4 ml-5">
                Welcome to our online store
              </h1>
              <h4 className="text-light mt-5 ml-5">
                Here you can find everything you need and you don't even need to
                get up from your sofa.
                <br />
                Best products online can be yours within 24H. And this store is
                always open 24/7, when you want to buy something for you loved
                ones, when you want to buy something for yourself , when you
                want to buy something for your dog,you can buy something even
                when you are drunk!
                <br /> <br />
                Please spend all your money here and help us be milioners and we
                won't even thank you!
              </h4>
            </Col>
          </Row>
        </Jumbotron>
        <Container>
          <InputGroup className="mb-3 mt-5">
            <InputGroup.Prepend>
              <InputGroup.Text>Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Search products by category..."
              onChange={(e) => {
                this.HandleSearchQuery(e.target.value);
              }}
            />
          </InputGroup>
          <Row className="my-5">
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
