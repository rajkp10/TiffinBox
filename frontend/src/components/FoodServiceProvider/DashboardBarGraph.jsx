/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useFoodProviderDashboard } from "../../context/DashboardContext/FoodProviderContext";

function DashboardBarGraph({ heading, data, xAxisDataKey, barDataKey }) {
  const { loading } = useFoodProviderDashboard();
  return (
    <div className="items-center card-body">
      <h2 className="card-title">{heading}</h2>
      {loading ? (
        <span className="loading loading-dots loading-lg text-primary"></span>
      ) : data.length !== 0 ? (
        <BarChart width={400} height={200} data={data}>
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Bar dataKey={barDataKey} barSize={30} fill="#8884d8" />
        </BarChart>
      ) : (
        <span className="text-4xl font-bold">Nothing to show</span>
      )}
    </div>
  );
}

export default DashboardBarGraph;
