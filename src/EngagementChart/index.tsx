import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import messageCountList from "./messageCount.json";
import channels from "./channels.json";
import engagementMessageOverTimeChartOptions from "./EngagementHalper";
import { useMemo } from "react";

export type MessageCountType = (typeof messageCountList)[0];
export type ChannelType = (typeof channels)[0];

const EngagementMessagesOverTime = () => {
  // I like to use useMemo to avoid unnecessary re-renders
  // But in this case, it's not needed because the data is static
  const options = useMemo(
    () => engagementMessageOverTimeChartOptions(messageCountList, channels),
    [messageCountList, channels]
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
