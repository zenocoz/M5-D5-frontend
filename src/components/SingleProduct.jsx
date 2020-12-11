import React from "react"
import { Card, Button } from "react-bootstrap"

function SingleProduct(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.productObj.imageUrl} />
      <Card.Body>
        <Card.Title>{props.productObj.name}</Card.Title>
        <h5>
          <strong className="text-info">Brand: </strong>
          {props.productObj.brand}
        </h5>
        <h5>
          <strong className="text-danger">Category: </strong>
          {props.productObj.category}
        </h5>
        <Card.Text>{props.productObj.description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            props.history.push("/details/" + props.productObj.ID)
          }}
        >
          Go to product detail
        </Button>
        <div className="d-flex mt-4  justify-content-between editButtons">
          <Button variant="danger" style={{ display: "none" }}>
            Delete
          </Button>
          <Button variant="info" style={{ display: "none" }}>
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default SingleProduct
