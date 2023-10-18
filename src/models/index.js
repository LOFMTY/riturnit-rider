// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TripStatus = {
  "NEW": "NEW",
  "ACCEPTED": "ACCEPTED",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "CANCELED": "CANCELED"
};

const DriverRegistrationStatus = {
  "NEW": "NEW",
  "COMPLETE": "COMPLETE",
  "REJECTED": "REJECTED"
};

const { PaymentIntent, RiturnitFees, Rating, RiturnitContactUs, RiturnitPoint, RiturnitScanPoint, RiturnitReceiptPoint, RiturnitCancelTripReason, Points, Car, Payment, DriverWallet, Receipt, TripCart, Trips, Store, Product, User, Driver, LicenseDocument, RegistrationDocument, InsuranceDocument, SystemNotification, DriverSystemNotification } = initSchema(schema);

export {
  PaymentIntent,
  RiturnitFees,
  Rating,
  RiturnitContactUs,
  RiturnitPoint,
  RiturnitScanPoint,
  RiturnitReceiptPoint,
  RiturnitCancelTripReason,
  Points,
  Car,
  Payment,
  DriverWallet,
  Receipt,
  TripCart,
  Trips,
  Store,
  Product,
  User,
  Driver,
  LicenseDocument,
  RegistrationDocument,
  InsuranceDocument,
  SystemNotification,
  DriverSystemNotification,
  TripStatus,
  DriverRegistrationStatus
};