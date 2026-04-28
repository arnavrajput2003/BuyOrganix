import styled from "styled-components";

// 🔹 MAIN CARD
const Container = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 250px;
  height: 300px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f5fbfd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 🔹 IMAGE
const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;   // 🔥 makes all images same size
`;

// 🔹 TITLE
const Title = styled.h3`
  text-align: center;
  margin: 5px 0;
`;

// 🔹 PRICE
const Price = styled.p`
  text-align: center;
  color: green;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Product = ({ item }) => {
  return (
    <Container>
      {/* 🔥 IMAGE WITH FALLBACK */}
      <Image
        src={item.img}
        alt={item.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/200?text=No+Image";
        }}
      />

      <Title>{item.title}</Title>
      <Price>₹{item.price}</Price>
    </Container>
  );
};

export default Product;