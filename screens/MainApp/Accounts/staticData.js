const Mockdata = [
  {
    id: 1,
    account: 'Robinhood',
    name: 'John Smith',
    value: '23,912.09',
    percent: '7%',
    img: '',
  },
  {
    id: 2,
    account: 'Silicon Valley Bank',
    name: 'John Smith',
    value: '152,320.46',
    percent: '74%',
    img: '',
  },
  {
    id: 3,
    account: 'Coinbase Pro',
    name: 'John Smith',
    value: '34,177.82',
    percent: '10%',
    img: '',
  },
];

const chartDummyData = [
  {
    id: 0,
    title: '1D',
    chartData: [
      -90, -80, -70, -60, -4, -24, 85, 91, 35, 53, 53, 24, 50, 20, 80, 85, 91,
      35, 53, 53, 24, 50, 20, 100,
    ],
  },
  {
    id: 1,
    title: '1W',
    chartData: [
      85, 91, 35, 53, 53, 24, 50, 20, 80, 85, 91, 35, 53, 53, 24, 50, 20, 100,
      -90, -80, -70, -60, -4, -24,
    ],
  },
  {
    id: 2,
    title: '1M',
    chartData: [
      80, 85, 91, 35, 53, 53, 24, 50, 20, 100, -90, -80, -70, -60, -4, -24, 85,
      91, 35, 53, 53, 24, 50, 20,
    ],
  },
  {
    id: 3,
    title: '1Y',
    chartData: [
      -90, -80, -70, -60, -4, -24, 85, 91, 35, 53, 53, 24, 50, 20, 80, 85, 91,
      35, 53, 53, 24, 50, 20, 100,
    ],
  },
  {
    id: 4,
    title: 'All',
    chartData: [
      85, 91, 35, 53, 53, 24, 50, 20, 80, 85, 91, 35, 53, 53, 24, 50, 20, 100,
    ],
  },
];

export {Mockdata, chartDummyData};
