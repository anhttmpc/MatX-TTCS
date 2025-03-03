import { create } from "lodash";
import Mock from "../mock";

const logList = [
  {
    id: 0,
    parkingImg:
      "https://plus.unsplash.com/premium_photo-1725708358944-844db020a73a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    chartImg:
      "https://plus.unsplash.com/premium_photo-1725708358944-844db020a73a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    numOfCar: "5",
    numOfPeople: "20",
    numOfColor: "3",
    meta: "Sample meta data 1",
    numOfGroup: "2",
    posOf4: "Position 4A",
    posOf5: "Position 5A",
    level: 10,
    version: 0,
    approvalStatus: 0,
    createdBy: "John Doe"
  },
  {
    id: 1,
    parkingImg:
      "https://plus.unsplash.com/premium_photo-1725708358944-844db020a73a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    chartImg:
      "https://plus.unsplash.com/premium_photo-1725708358944-844db020a73a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    numOfCar: "5",
    numOfPeople: "20",
    numOfColor: "3",
    meta: "Sample meta data 1",
    numOfGroup: "2",
    posOf4: "Position 4A",
    posOf5: "Position 5A",
    level: 10,
    version: 0,
    approvalStatus: 3,
    createdBy: "John Doe"
  },
  {
    id: 2,
    parkingImg:
      "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    chartImg:
      "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    numOfCar: "5",
    numOfPeople: "20",
    numOfColor: "3",
    meta: "Sample meta data 1",
    numOfGroup: "2",
    posOf4: "Position 4A",
    posOf5: "Position 5A",
    level: 11,
    version: 0,
    approvalStatus: 1,
    createdBy: "Mie Lee"
  },
  {
    id: 3,
    parkingImg:
      "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    chartImg:
      "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    numOfCar: "8",
    numOfPeople: "30",
    numOfColor: "4",
    meta: "Sample meta data 3",
    numOfGroup: "3",
    posOf4: "Position 4C",
    posOf5: "Position 5C",
    level: 12,
    version: 1,
    approvalStatus: 2,
    comment: "This is a comment",
    createdBy: "thaodth"
  }
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "8",
  //   numOfPeople: "30",
  //   numOfColor: "4",
  //   meta: "Sample meta data 3",
  //   numOfGroup: "3",
  //   posOf4: "Position 4C",
  //   posOf5: "Position 5C",
  //   level: 12,
  //   version: 2,
  //   approvalStatus: 2
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "12",
  //   numOfPeople: "60",
  //   numOfColor: "6",
  //   meta: "Sample meta data 4",
  //   numOfGroup: "5",
  //   posOf4: "Position 4D",
  //   posOf5: "Position 5D",
  //   level: 13,
  //   version: 1,
  //   approvalStatus: 1
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "7",
  //   numOfPeople: "25",
  //   numOfColor: "2",
  //   meta: "Sample meta data 5",
  //   numOfGroup: "1",
  //   posOf4: "Position 4E",
  //   posOf5: "Position 5E",
  //   level: 14,
  //   version: 2,
  //   approvalStatus: 0
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "15",
  //   numOfPeople: "70",
  //   numOfColor: "7",
  //   meta: "Sample meta data 6",
  //   numOfGroup: "6",
  //   posOf4: "Position 4F",
  //   posOf5: "Position 5F",
  //   level: 15,
  //   version: 2,
  //   approvalStatus: 0
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "9",
  //   numOfPeople: "35",
  //   numOfColor: "3",
  //   meta: "Sample meta data 7",
  //   numOfGroup: "3",
  //   posOf4: "Position 4G",
  //   posOf5: "Position 5G",
  //   level: 16,
  //   version: 3,
  //   approvalStatus: 1
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "11",
  //   numOfPeople: "55",
  //   numOfColor: "5",
  //   meta: "Sample meta data 8",
  //   numOfGroup: "5",
  //   posOf4: "Position 4H",
  //   posOf5: "Position 5H",
  //   level: 17,
  //   version: 3,
  //   approvalStatus: 1
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "6",
  //   numOfPeople: "28",
  //   numOfColor: "4",
  //   meta: "Sample meta data 9",
  //   numOfGroup: "2",
  //   posOf4: "Position 4I",
  //   posOf5: "Position 5I",
  //   level: 18,
  //   version: 4,
  //   approvalStatus: 0
  // },
  // {
  //   parkingImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   chartImg:
  //     "https://images.unsplash.com/photo-1731596691186-631e1fc65acd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   numOfCar: "13",
  //   numOfPeople: "65",
  //   numOfColor: "6",
  //   meta: "Sample meta data 10",
  //   numOfGroup: "6",
  //   posOf4: "Position 4J",
  //   posOf5: "Position 5J",
  //   level: 19,
  //   version: 4,
  //   approvalStatus: 0
  // }
];

// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com

Mock.onPost("/api/log/data").reply(async (config) => {
  try {
    // Assuming no specific data is needed from the request to return the logList
    return [200, { logList }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
