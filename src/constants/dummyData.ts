const onboardingItems = [
  {
    id: '1',
    title: 'What do you want to Return today?',
    description:
      'choose anything you want to return from your favorite stores.',
    image: require('./../assets/images/find.png'),
  },
  {
    id: '2',
    title: 'What should do when you buy things?',
    description:
      'Scan items and receipts to earn points and to receive notification when return policy expires.',
    image: require('./../assets/images/tag.png'),
  },
  {
    id: '3',
    title: 'Your time is precious let us...',
    description:
      'Have someone do you you the honor of returning you your precious items more important money with a click of a button.',
    image: require('./../assets/images/time.png'),
  },
  {
    id: '4',
    title: 'Reimbursement',
    description:
      'payment made easy through debit card, credit card & more way to reimburse you.',
    image: require('./../assets/images/wait_money.png'),
  },
];

const walletAmount = [
  {
    id: '1',
    value: 50,
    isSelected: false,
  },
  {
    id: '2',
    value: 100,
    isSelected: false,
  },
  {
    id: '3',
    value: 200,
    isSelected: false,
  },
  {
    id: '4',
    value: 500,
    isSelected: false,
  },
  {
    id: '5',
    value: 1000,
    isSelected: false,
  },
];

const myPayments = [
  {
    id: 1,
    name: 'Riturnit Wallet',
    icon: require('../assets/icons/riturnitCash.png'),
  },
];

const allCards = [
  {
    id: 1,
    name: 'PayPal',
    icon: require('../assets/icons/paypal.png'),
  },
  {
    id: 2,
    name: 'Google Pay',
    icon: require('../assets/icons/google.png'),
  },
  {
    id: 3,
    name: 'Master Card',
    icon: require('../assets/icons/mastercard.png'),
  },
  {
    id: 4,
    name: 'VISA',
    icon: require('../assets/icons/visa.png'),
  },
];

const onboarding = onboardingItems;

export default {
  onboarding,
  walletAmount,
  myPayments,
  allCards,
};
