/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import { FaArrowRight } from "react-icons/fa";
import { useOrderCartContext } from "../../context/OrderCartContext/OrderCartContext";
import { useOrderContext } from "../../context/OrderContext/OrderContext";
import { useNavigate } from "react-router-dom";

function OrderBreakDown() {
  const { cart } = useOrderCartContext();
  const { placeOrder } = useOrderContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full gap-8 lg:w-5/6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold capitalize">total</h2>
        <span className="text-lg capitalize">payment</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="capitalize text-md">cart total</span>
          <span className="text-md">${cart?.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize text-md">tax</span>
          <span className="text-md">${cart?.taxAmount}</span>
        </div>
        <div className="my-0 divider"></div>
        <div className="flex justify-between">
          <span className="capitalize text-md">total amount</span>
          <span className="text-md">${cart?.totalAmount}</span>
        </div>
      </div>
      <button
        className="w-full btn btn-primary"
        onClick={() =>
          document.getElementById("confirm_order_modal").showModal()
        }
      >
        <p className="flex items-center gap-2">
          <span>Checkout</span>
          <FaArrowRight />
        </p>
      </button>
      <dialog id="confirm_order_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Confirm Order</h3>
          <p className="py-4">Press Confirm to place order.</p>
          <div className="flex justify-end gap-6">
            <form method="dialog">
              <button className="btn btn-error">Cancel</button>
            </form>
            <button
              className="btn btn-success"
              onClick={() => {
                placeOrder(cart);
                navigate("/customer/home-page");
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default OrderBreakDown;
