import React from "react";
import { Card, Button } from "react-bootstrap";

function SingleProduct(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.productObj.imageUrl} />
      <Card.Body>
        <Card.Title>{props.productObj.name}</Card.Title>
        <Card.Text>{props.productObj.description}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
