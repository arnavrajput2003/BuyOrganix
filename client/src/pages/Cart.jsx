import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/apiCalls";
import { addProduct, delCart } from "../redux/cartRedux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const KEY = process.env.REACT_APP_STRIPE;
const RAZORPAY_KEY = "rzp_test_SiuDDlDUw6FjgT";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`flex: 3;`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`width: 200px;`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`font-size: 24px;`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;
const SummaryTitle = styled.h1`font-weight: 200;`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
  cursor: pointer;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.color || "black"};
  color: white;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  border: none;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockError, setStockError] = useState("");

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  const delClick = () => {
    dispatch(delCart());
  };

  // ✅ Razorpay Handler
  const handleRazorpay = async () => {
    try {
      const res = await publicRequest.post("/razorpay/create-order", {
        amount: cart.total + 25,
      });

      const options = {
        key: RAZORPAY_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "BuyOrganix",
        description: "Order Payment",
        order_id: res.data.id,
        handler: async (response) => {
          try {
            const orderRes = await userRequest.post("/orders", {
              products: cart.products,
              userId: currentUser._id,
              address: "Razorpay Order",
              amount: cart.total + 25,
            });
            clearCart(dispatch);
            history.push("/success/" + orderRes.data._id);
          } catch (err) {
            console.log("Order save error", err);
          }
        },
        prefill: {
          name: currentUser?.username,
          email: currentUser?.email,
        },
        theme: { color: "#008000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Razorpay error", err);
    }
  };

  useEffect(() => {
    const makeRequest2 = async () => {
      try {
        const res2 = await userRequest.post("/orders", {
          products: cart.products,
          userId: currentUser._id,
          address: stripeToken.card.address_line1 + " " + stripeToken.card.address_city + " " + stripeToken.card.address_zip,
          amount: cart.total + 25,
        });
        history.push("/success/" + res2.data._id, {
          stripeData: res2.data,
          products: cart,
        });
        setOrderId(res2);
      } catch {
        console.log("error here");
      }
      try {
        await userRequest.post("/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: (cart.total + 25) * 100,
        });
      } catch {
        console.log("error here 2");
      }
      clearCart(dispatch);
    };

    stripeToken && makeRequest2();
  }, [cart, stripeToken, cart.total, history]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton type="filled">CONTINUE SHOPPING</TopButton>
          </Link>
          <TopButton type="filled" onClick={delClick}>Delete Cart</TopButton>
        </Top>
        <Bottom>
          <Info>
            {stockError !== "" && (
              <Typography color="error" variant="h5">{stockError}</Typography>
            )}
            {cart.products.map((product, index) => {
              const stock = product.stock || 10;
              return (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName><b>Product:</b> {product.title}</ProductName>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                    </ProductAmountContainer>
                    <AddContainer>
                      <AmountContainer>
                        <Remove onClick={() => {
                          if (stock >= product.quantity) setStockError("");
                          dispatch(addProduct({ ...product, quantity: -1 }));
                        }} />
                        <Amount>{product.quantity}</Amount>
                        <Add onClick={() => {
                          if (stock <= product.quantity) {
                            setStockError(`${product.title} is Out of Stock`);
                            return;
                          } else {
                            setStockError("");
                          }
                          dispatch(addProduct({ ...product, quantity: 1 }));
                        }} />
                      </AmountContainer>
                    </AddContainer>
                    <ProductPrice>₹ {product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 30.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total + 25}</SummaryItemPrice>
            </SummaryItem>

            {/* Stripe */}
            <StripeCheckout
              name="BuyOrganix"
              image="../favicon.ico"
              billingAddress
              shippingAddress
              description={"Your total is ₹" + (cart.total + 25)}
              amount={(cart.total + 25) * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button color="black">PAY WITH CARD (Stripe)</Button>
            </StripeCheckout>

            {/* Razorpay */}
            <Button color="#0047AB" onClick={handleRazorpay}>
              PAY WITH UPI / Razorpay 🇮🇳
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;