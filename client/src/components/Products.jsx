import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const NotFound = styled.div`
  font-size: 24px;
  color: gray;
  text-align: center;
  width: 100%;
  margin-top: 50px;
`;

const Products = ({ cat, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🔥 FILTER BY CATEGORY OR SEARCH
  useEffect(() => {
    if (cat) {
      // Check if it matches a category exactly
      const categoryMatch = popularProducts.filter(
        (item) => item.category.toLowerCase() === cat.toLowerCase()
      );

      if (categoryMatch.length > 0) {
        // It's a category filter
        setFilteredProducts(categoryMatch);
      } else {
        // It's a search query — filter by title
        const searchMatch = popularProducts.filter((item) =>
          item.title.toLowerCase().includes(cat.toLowerCase())
        );
        setFilteredProducts(searchMatch);
      }
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
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))
      ) : (
        <NotFound>No products found for "{cat}" 😔</NotFound>
      )}
    </Container>
  );
};

export default Products;