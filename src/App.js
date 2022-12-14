import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendData } from './store/cart-data-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartDisplay = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial){
      isInitial=false;
      return;
    }
    if(cart.changed){
      dispatch(sendData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {cartDisplay && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
