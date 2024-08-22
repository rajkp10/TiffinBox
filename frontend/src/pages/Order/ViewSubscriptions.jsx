/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import React, { useEffect } from "react";
import { useOrderContext } from "../../context/OrderContext/OrderContext";
import SubscriptionCard from "../../components/Subscription/SubscriptionCard";

function ViewSubscriptions() {
  const { orders, getSubscription, loading } = useOrderContext();

  useEffect(() => {
    getSubscription();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-dvh">
      <div className="w-full max-w-5xl px-4 my-10">
        <p className="mb-10 text-4xl font-bold">
          <span className="text-5xl text-primary">/</span>
          <span>Subscriptions</span>
        </p>
        {loading ? (
          <div className="grid pt-20 place-content-center">
            <span className="text-center loading loading-dots loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {orders.subscriptionList?.map((subscription) => {
              return (
                <SubscriptionCard
                  key={subscription.subscriptionId}
                  subscription={subscription}
                />
              );
            })}
          </div>
        )}
        {!loading && orders?.subscriptionList.length === 0 && (
          <div className="grid flex-1 w-full h-full gap-8 place-content-center">
            <h2 className="text-3xl font-semibold">
              You haven't subscribed yet.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSubscriptions;
