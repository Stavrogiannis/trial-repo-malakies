export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"]
export const HALFMONTHS = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"]
export const ZONES = [
  "zone_01",
  "zone_10",
  "zone_11",
  "zone_12",
  "zone_2",
  "zone_3",
  "zone_4",
  "zone_5",
  "zone_6",
  "zone_7",
  "zone_8",
  "zone_9",
  "nekrotafeio_a",
]

export const columnsSuggest = [
  {field:"id", headerName:"ID",flex:0.5},
  {field:"suggestion", headerName:"Suggestions Per Zone", flex:5}
]

export const columnsMonthsPY = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'monthName',
    headerName: 'Month',
    width: 150,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 150,
  },
  {
    field: 'guests',
    headerName: 'Guests',
    width: 110,
  },
  {
    field: "popularity",
    headerName: "Popularity",
    width: 110
  },
  {
    field: "profit",
    headerName: "Profit",
    width: 110
  }
]

export const columnsZonePY = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'zoneName',
    headerName: 'Zone name',
    flex: 1,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    flex: 1,
  },
  {
    field: 'guests',
    headerName: 'Guests',
    flex: 1,
  },
  {
    field: "popularity",
    headerName: "Popularity",
    flex: 1,
  },
  {
    field: "profit",
    headerName: "Profit",
    flex: 1,
  }
]