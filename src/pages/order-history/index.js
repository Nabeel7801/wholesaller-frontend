import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, update } from "dataProvider";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import { Container, Tabs, Tab } from "@material-ui/core";

import MainNavbar from "components/Navbars/MainNavbar";
import { confirm } from 'utils/confirm';
import TabPanel from './TabPanel';
import OrderCard from "./OrderCard";

import { setCart } from 'store/reducers/cart'

function OrderHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);

  const [value, setValue] = useState(0);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    const params = {
      filter: { user_id: user._id }
    }
    getList("admin/orders", params)
    .then(({ data : orders }) => {
      setCurrentOrders((orders || []).filter(order => order.status === 'pending' || order.status === 'dispatched'))
      setPreviousOrders((orders || []).filter(order => order.status === 'delivered' || order.status === 'cancelled'))
    })
  }, [user._id])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const reorderHandler = (items) => {
    if (cartItems && cartItems.length > 0) {
      confirm("This Action will remove your existing items from the cart. Are you sure you want to PROCEED", () => {
        dispatch(setCart(items))
        navigate("/cart");
      })

    }else {
      dispatch(setCart(items))
      navigate("/cart");
    }
    
  }

  const cancelOrder = (cardID) => {
    confirm("Are you sure you want to cancel this order? This Action cannot be undone.", () => {
      update("admin/orders", {data: { status: "cancelled" }, id: cardID})
      .then(({ data }) => {
        setCurrentOrders(currentOrders.filter(order => order.id !== cardID))
        setPreviousOrders([data, ...previousOrders])
      })
    })
  }

  return (
    <div>
      { user ? <MainNavbar /> : <IndexNavbar /> }

      <br />

      <div className="mt-0 lg:mt-10 md:px-4 lg:px-6">
        <Container maxWidth="lg">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Current Orders" />
            <Tab label="Purchase History" />
          </Tabs>

          <TabPanel value={value} index={0}>
            
            {currentOrders?.map(order => <OrderCard card={order} reorderHandler={reorderHandler} cancelOrder={cancelOrder} />)}
            {currentOrders.length === 0 && 
              <h5 className="text-2xl sm:text-3xl flex justify-center items-center mx-auto mt-5 text-center" style={{color: '#aaa'}}>
                No Active Orders
              </h5>
            } 
          </TabPanel>

          <TabPanel value={value} index={1} sx={{backgroundColor: '#eee'}}>
            
            {previousOrders?.map(order => <OrderCard card={order} reorderHandler={reorderHandler} />)}
            {previousOrders.length === 0 && 
              <h5 className="text-2xl sm:text-3xl flex justify-center items-center mx-auto mt-5 text-center" style={{color: '#aaa'}}>
                No Previous Orders
              </h5>
            } 
          </TabPanel>
        </Container>
      </div>

      <DemoFooter />
    </div>
  );
}

export default OrderHistory;
