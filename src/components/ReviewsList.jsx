import React, { Component } from "react"
import {
  ListGroup,
  Alert,
  Container,
  Row,
  Col,
  Badge,
  Button,
} from "react-bootstrap"
import ReviewForm from "./ReviewForm"

export default class ReviewsList extends Component {
  state = {
    productId: this.props.productId,
    reviews: [],
  }

  fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT}/reviews`
      )

      if (response.ok) {
        console.log("OK")
        const reviews = await response.json()
        const productReviews = reviews.filter(
          (review) => review.elementId === this.props.productId
        )
        console.log(productReviews)
        this.setState({ reviews: productReviews })
      }
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount = () => {
    this.fetchComments()
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {this.state.reviews.length > 0 &&
                this.state.reviews.map((review) => (
                  <ListGroup.Item>
                    {review.comment}{" "}
                    {review.rate > 3 ? (
                      <Badge pill variant="success">
                        {review.rate}
                      </Badge>
                    ) : (
                      <Badge pill variant="warning">
                        {review.rate}
                      </Badge>
                    )}
                  </ListGroup.Item>
                ))}
            </ListGroup>
            <ReviewForm productId={this.props.productId} />
          </Col>
        </Row>
      </Container>
    )
  }
}
