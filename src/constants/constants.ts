const PaymentMethods = [
  {
    id: 0,
    label: 'Riturnit Wallet',
    img: require('../assets/icons/riturnitCash.png'),
    amount: 0,
  },
];

const cancelRequest = [
  {
    id: '1',
    label: "Driver isn't here",
  },
  {
    id: '2',
    label: 'Wrong address shown',
  },
  {
    id: '3',
    label: "Driver didn't respond",
  },
  {
    id: '4',
    label: 'Driver asked to cancel ride',
  },
  {
    id: '5',
    label: 'Other reasons',
  },
];

const autoRefillAmount = [
  {id: '1', amount: '25'},
  {id: '2', amount: '50'},
  {id: '3', amount: '100'},
  {id: '4', amount: 'Custom amount'},
];

export default {
  cancelRequest,
  PaymentMethods,
  autoRefillAmount,
};
