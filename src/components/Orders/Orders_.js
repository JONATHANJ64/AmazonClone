import './Orders_.css';
import { useStateValue } from "../../StateProvider";

function Orders() {
  const [{ user }] = useStateValue();

  return (
    <div className='orders'>
      <div className='order__container'>
        <div className='order__section'>
          <div className='order__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='order__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Order section - Order Completed */}
        <div className='order__section'>
          <div className='order__title'>
            <h3>Order Completed</h3>
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
