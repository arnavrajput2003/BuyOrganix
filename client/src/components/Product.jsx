import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

// 🔹 MAIN CARD
const Container = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 250px;
  height: 330px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f5fbfd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Title = styled.h3`
  text-align: center;
  margin: 5px 0;
`;

const Price = styled.p`
  text-align: center;
  color: green;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin: 0 10px 10px 10px;
  padding: 8px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: darkgreen;
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };

  return (
    <Container>
      <Image
        src={item.img}
        alt={item.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/200?text=No+Image";
        }}
      />
      <Title>{item.title}</Title>
      <Price>₹{item.price}</Price>
      <Button onClick={handleAddToCart}>Add to Cart 🛒</Button>
    </Container>
  );
};

export default Product;