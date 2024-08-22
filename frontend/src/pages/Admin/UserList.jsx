/**
 * Author: Keval Gandevia
 */

import { useEffect, useState } from "react";
import { useAdminContext } from "../../context/AdminContext/AdminContext";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userToRemove, setUserToRemove] = useState(null);
  const { userList, getAllUsers, removeUser, isLoading } = useAdminContext();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = userList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (email) => {
    setUserToRemove(email);
    document.getElementById("remove_user_modal").showModal();
  };

  const confirmRemove = () => {
    if (userToRemove) {
      removeUser(userToRemove);
      setUserToRemove(null);
      document.getElementById("remove_user_modal").close();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="grid max-w-5xl mx-auto min-h-dvh place-content-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container px-6 py-6 mx-auto min-h-dvh">
      <div className="grid grid-cols-1 gap-10">
      <p className="mb-10 text-4xl font-bold">
          <span className="text-5xl text-primary">/</span>
          <span>User List</span>
        </p>
        {/* Search box starts */}
        <div>
          <label className="flex items-center gap-2 input input-bordered">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {/* Search box ends */}
        {/* Order list starts */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((item) => (
                  <tr key={item.userId}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>
                      <button
                        className="btn btn-error"
                        onClick={() => handleRemove(item.email)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRows.length === 0 ? (
              <h1 className="my-2 text-xl font-bold text-center">No Users!</h1>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Order list ends */}
      </div>
      {/* Modal starts */}
      <dialog
        id="remove_user_modal"
        className="modal modal-middle sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Remove User</h3>
          <p className="py-4">Are you sure want to remove this user?</p>
          <div className="modal-action">
            <div className="flex justify-start gap-2 mt-4">
              <div>
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
              <div>
                <button className="btn btn-error" onClick={confirmRemove}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserList;
