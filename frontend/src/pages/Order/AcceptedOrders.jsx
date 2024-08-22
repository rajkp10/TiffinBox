/**
 * Author: Keval Gandevia
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderTrackContext } from "../../context/OrderTrackContext/OrderTrackContext";
import { toast } from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";

function AcceptedOrders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const {
    acceptedOrderList,
    getAllAcceptedOrders,
    updateOrderStatus,
    verifyOtp,
    isLoading,
    searchDate,
    setSearchDate,
  } = useOrderTrackContext();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = acceptedOrderList.filter(
    (item) =>
      item.orderId.toString().includes(searchQuery) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currentOrderStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (item) => {
    navigate(`/foodprovider/received-orders/${item.orderId}`);
  };

  const handleUpdateClick = (item, status) => {
    if (
      item.currentOrderStatus === "DELIVERED" &&
      (status === "DELIVERED" || status === "IN_PREPARATION")
    ) {
      toast.error("Order is already delivered!");
      return;
    }

    setSelectedOrder(item);
    setNewStatus(status);

    if (status === "DELIVERED") {
      updateOrderStatus({ ...item, newStatus: status });
      document.getElementById("update_order_status_modal").showModal();
    } else {
      updateOrderStatus({ ...item, newStatus: status });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!otp) {
      setOtpError("Please enter the OTP!");
      return;
    }
    setOtpError("");

    try {
      const response = await verifyOtp({ orderId: selectedOrder.orderId, otp });
      if (response.success) {
        toast.success(response.message);
        document.getElementById("update_order_status_modal").close();
        getAllAcceptedOrders();
      } else {
        setOtpError(response.message);
      }
    } catch (error) {
      setOtpError(
        "An error occurred while verifying the OTP. Please try again."
      );
    }
  };

  useEffect(() => {
    getAllAcceptedOrders();
  }, [searchDate]);

  return (
    <div className="container px-6 py-6 mx-auto min-h-dvh">
      <div className="grid grid-cols-1 gap-10">
        <p className="mb-10 text-4xl font-bold">
          <span className="text-5xl text-primary">/</span>
          <span>Accepted Orders</span>
        </p>
        {/* Search box starts */}
        <div>
          <div className="flex flex-col gap-6 md:flex-row">
            <label className="flex items-center gap-2 md:flex-1 input input-bordered">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaMagnifyingGlass />
            </label>
            <div>
              <input
                type="date"
                value={searchDate}
                className="input input-bordered"
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Search box ends */}
        {/* Order list starts */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Current Status</th>
                  <th>View</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((item) => (
                  <tr key={item.orderId}>
                    <td>{item.orderId}</td>
                    <td>{item.customerName}</td>
                    <td>
                      <div className="flex">
                        {item.currentOrderStatus === "IN_PREPARATION" ? (
                          <span className="badge badge-secondary text-[8px] md:text-sm md:font-light font-bold">
                            {item.currentOrderStatus}
                          </span>
                        ) : item.currentOrderStatus === "ACCEPTED" ? (
                          <span className="badge badge-info text-[8px] md:text-sm md:font-light font-bold">
                            {item.currentOrderStatus}
                          </span>
                        ) : (
                          <span className="badge badge-success text-[8px] font-bold md:text-sm md:font-light">
                            {item.currentOrderStatus}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-neutral"
                        onClick={() => handleViewClick(item)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="m-1 btn btn-accent"
                        >
                          Update
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a
                              onClick={() =>
                                handleUpdateClick(item, "IN_PREPARATION")
                              }
                            >
                              In-Preparation
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                handleUpdateClick(item, "DELIVERED")
                              }
                            >
                              Delivered
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRows.length === 0 ? (
              <h1 className="my-2 text-xl font-bold text-center">
                No Accepted Orders!
              </h1>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Order list ends */}
      </div>
      <dialog
        id="update_order_status_modal"
        className="modal modal-middle sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Order Verification</h3>
          <form className="mt-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="font-bold label-text">OTP</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full input input-bordered"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpError && (
                  <p className="mt-1 text-sm text-red-500">{otpError}</p>
                )}
              </div>
            </div>
            <div className="modal-action">
              <div className="flex justify-start gap-2 mt-4">
                <div>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
                <div>
                  <button className="btn btn-info" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default AcceptedOrders;
