import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🔥 FILTER BY CATEGORY
  useEffect(() => {
    if (cat) {
      const filtered = popularProducts.filter(
        (item) => item.category.toLowerCase() === cat.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(popularProducts);
    }
  }, [cat]);

  // 🔥 SORTING
  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;