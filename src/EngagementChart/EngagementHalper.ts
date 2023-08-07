import { ChannelType, MessageCountType } from ".";

function engagementMessageOverTimeChartOptions(
  messageCountList: MessageCountType[],
  channels: ChannelType[]
) {
  //here I map the messages by channel
  const channelsWithMultipleDays = messageCountList.reduce((channels, item) => {
    const channelId = item.channelId;

    if (channels.has(channelId)) {
      const existingData = channels.get(channelId);
      //unlikely case
      if (!existingData) return channels;
      existingData.push(item);
    } else {
      channels.set(channelId, [item]);
    }
    return channels;
  }, new Map<string, MessageCountType[]>());

  //here I filter out the channels that have only one day of data
  channelsWithMultipleDays.forEach((channelData, channelId) => {
    if (channelData.length <= 1) {
      channelsWithMultipleDays.delete(channelId);
    }
  });

  //here I map the data to the format that the chart library expects
  const series: { name: string; data: number[][] }[] = [];
  channelsWithMultipleDays.forEach((messages, channelId) => {
    series.push({
      name:
        channels.find((channel) => channel.id === channelId)?.name ??
        "undefined",
      data: messages.map((message) => {
        return [new Date(message.timeBucket).getTime(), Number(message.count)];
      }),
    });
  });

  return {
    title: { text: "Messages Over Time" },
    chart: {
      type: "spline",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Message Count",
      },
    },
    series,

    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "{point.y} messages on {point.x:%e %b}",
    },
  };
}

export default engagementMessageOverTimeChartOptions;
