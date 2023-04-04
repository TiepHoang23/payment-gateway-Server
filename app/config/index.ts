import mongodb  from './mongodb.js';
import  jwt  from './jwt.js';
import paypal  from './paypal.js';

export default {
  ...mongodb,
  ...jwt,
  ...paypal,
};
