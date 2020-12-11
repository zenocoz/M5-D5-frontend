
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";


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

        <h4 className="text-warning">Price: ${props.productObj.price}</h4>
        <Button variant="primary" onClick={() => {
            props.history.push("/details/" + props.productObj.ID)
          }}>Go to product detail</Button>
        <div className="mt-4 editButtons" style={{ display: "none" }}>
          <Button variant="danger">Delete</Button>
          <Link to="/backoffice">
            <Button variant="info" onClick={props.editProduct}>
              Edit
            </Button>
          </Link>

        </div>
      </Card.Body>
    </Card>
  )
}


export default withRouter(SingleProduct);

