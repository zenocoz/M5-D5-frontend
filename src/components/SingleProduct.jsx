import React from "react";
import { Card, Button } from "react-bootstrap";

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
        <Button variant="primary">Go to product detail</Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
