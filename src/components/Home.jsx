import React from "react";

class Home extends React.Component {
  state = {
    products: [],
    loading: true,
  };

  fetchProducts = async () => {
    this.setState({ loading: true });
    try {
      let response = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT}/products`
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return <></>;
  }
}

export default Home;
