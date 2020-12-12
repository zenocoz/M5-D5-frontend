import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default class ReviewForm extends Component {
  state = {
    review: {
      elementId: this.props.productId,
    },
  };

  handleChange = (e) => {
    this.setState({
      review: {
        ...this.state.review,
        [e.target.id]: e.target.value,
      },
    });
  };

  addReview = async (e) => {
    e.preventDefault();
    try {
      console.log(this.state.review);
      const url = `http://localhost:${process.env.REACT_APP_PORT}/reviews`;
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(this.state.review),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        alert("comment added");
        this.setState({ review: { elementId: this.props.productId } });
      } else {
        alert("something went wrong");
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.addReview}>
          <Col xs="7">
            <Form.Control
              type="text"
              placeholder="Normal text"
              id="comment"
              value={this.state.review.comment}
              onChange={(e) => this.handleChange(e)}
            />
          </Col>

          <Col>
            <Form.Control
              as="select"
              className="mr-sm-2"
              id="rate"
              onChange={(e) => this.handleChange(e)}
              custom
            >
              <option value="0">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Col>
          <Button variant="primary" type="submit">
            Add Review
          </Button>
        </Form>
      </>
    );
  }
}
