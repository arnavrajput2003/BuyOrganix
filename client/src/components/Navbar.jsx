import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { lgout } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Search } from "@material-ui/icons";

const Container = styled.div`
  height: 60px;
  background-color: #34eb77;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid green;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  text-decoration: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Input = styled.input`
  padding: 5px;
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const MenuItem = styled.div`
  font-size: 17px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [search, setSearch] = useState("");
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    lgout(dispatch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/products/${search}`);
    }
  };

  if (!user) {
    return (
      <Container>
        <Wrapper>
          <Left>
            <form onSubmit={handleSubmit}>
              <SearchContainer>
                <Input
                  placeholder="Search Products"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  style={{ color: "black", fontSize: 25, cursor: "pointer" }}
                  onClick={handleSubmit}
                />
              </SearchContainer>
            </form>
          </Left>
          <Center>
            <Logo>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                BuyOrganix
              </Link>
            </Logo>
          </Center>
          <Right>
            <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>SHOP</MenuItem>
            </Link>
            <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>SIGN IN</MenuItem>
            </Link>
            <Link to="/login">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    );
  } else {
    return (
      <Container>
        <Wrapper>
          <Left>
            <Language>
              <Link to="/">
                <img src="../favicon.ico" width="45" height="35" alt="" />
              </Link>
            </Language>
            <form onSubmit={handleSubmit}>
              <SearchContainer>
                <Input
                  placeholder="Search Products"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  style={{ color: "black", fontSize: 25, cursor: "pointer" }}
                  onClick={handleSubmit}
                />
              </SearchContainer>
            </form>
          </Left>
          <Center>
            <Logo>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                BuyOrganix
              </Link>
            </Logo>
          </Center>
          <Right>
            <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>SHOP</MenuItem>
            </Link>
            <Link to={"/user/" + user._id} style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>Hello, {user.username.toUpperCase()}</MenuItem>
            </Link>
            <Link to="/" onClick={handleClick} style={{ textDecoration: "none", color: "black" }}>
              <MenuItem><b>Logout</b></MenuItem>
            </Link>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    );
  }
};

export default Navbar;