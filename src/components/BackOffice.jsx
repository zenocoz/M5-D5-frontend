import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class BackOffice extends React.Component {
  state = {
    addProduct: {
      name: "",
      description: "",
      brand: "",
      price: 0,
      category: "",
    },
    post: null,
  };

  updateProductFields = (e) => {
    let addProduct = { ...this.state.addProduct };
    let currentID = e.currentTarget.id;

    addProduct[currentID] = e.currentTarget.value;
    this.setState({ addProduct });
  };
  fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append("product", e.target.files[0]);
    this.setState({ post: formData });
  };

  fetchImage = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT}/products/${id}/uploadPicture`,
        {
          method: "POST",
          body: this.state.post,
        }
      );
      if (response.ok) {
        console.log("OK");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  submitProduct = async (e) => {
    e.preventDefault();
    try {
      let url = `http://localhost:${process.env.REACT_APP_PORT}/products`;
      let response;
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(this.state.addProduct),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        alert("Product added");
        const data = await response.json();
        if (this.state.post !== null) {
          this.fetchImage(data.ID);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col
              md={{ span: 6, offset: 3 }}
              className="bg-dark text-light rounded"
            >
              <Form className="p-5" onSubmit={this.submitProduct}>
                <Form.Group>
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={this.state.addProduct.name}
                    onChange={this.updateProductFields}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="brand">Brand</Form.Label>
                  <Form.Control
                    type="text"
                    id="brand"
                    name="brand"
                    placeholder="Enter product brand"
                    value={this.state.addProduct.brand}
                    onChange={this.updateProductFields}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    value={this.state.addProduct.description}
                    onChange={this.updateProductFields}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="category">Category</Form.Label>
                  <Form.Control
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Enter product category"
                    value={this.state.addProduct.category}
                    onChange={this.updateProductFields}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="price">Price</Form.Label>
                  <Form.Control
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={this.state.addProduct.price}
                    onChange={this.updateProductFields}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="file"
                    id="fileUpload"
                    onChange={this.fileUploadHandler}
                    style={{ display: "none" }}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  />
                  <Button
                    className="rounded-pill mr-3 my-3 p-1 px-4 w-100"
                    variant="primary"
                    onClick={() => this.fileInput.click()}
                  >
                    Upload file
                  </Button>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button variant="outline-light" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BackOffice;
