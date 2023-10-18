function calculateAngle(coordinates) {
  let startLat = coordinates[0]['latitude'];
  let startLng = coordinates[0]['longitude'];
  let endLat = coordinates[1]['latitude'];
  let endLng = coordinates[1]['longitude'];
  let dx = endLat - startLat;
  let dy = endLng - startLng;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export const GOOGLE_MAPS_APIKEY = 'AIzaSyDPMHmRw3LbdXZCfrLu7DxmhDgv2u_9SKU';
export const ErrorJSON =
  'https://res.cloudinary.com/dy6v7jqqk/raw/upload/v1674748539/Riturnit/Customer/assets/json/error.json';
export const DEFAULT_IMAGE =
  'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1674481755/Riturnit/Customer/assets/images/noImage.png';

export const DEFAULT_PROFILE_IMG =
  'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1674481850/Riturnit/Customer/assets/icons/avatar.png';

export const PAYMENT_IMAGE =
  'https://res.cloudinary.com/dy6v7jqqk/raw/upload/v1674481781/Riturnit/Customer/assets/json/payment.json';

const utils = {
  calculateAngle,
};

export default utils;
