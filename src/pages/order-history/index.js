import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "dataProvider";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import { Tabs, Tab } from "@material-ui/core";

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
      setCurrentOrders((orders || []).filter(order => order.status === 'pending'))
      setPreviousOrders((orders || []).filter(order => order.status !== 'pending'))
    })
  }, [])
  
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

  return (
    <div>
      { user ? <MainNavbar /> : <IndexNavbar /> }

      <br />

      <div className="mt-0 lg:mt-10 px-2 md:px-4 lg:px-6">

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
          
          {currentOrders?.map(order => <OrderCard card={order} reorderHandler={reorderHandler} />)}

        </TabPanel>

        <TabPanel value={value} index={1} sx={{backgroundColor: '#eee'}}>
          
          {previousOrders?.map(order => <OrderCard card={order} reorderHandler={reorderHandler} />)}

        </TabPanel>

      </div>

      <DemoFooter />
    </div>
  );
}

export default OrderHistory;
