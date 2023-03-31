let authRouter = require('./auth');
let paymentRouter = require('./payment');
const auth = require('../middleware/auth');

function attachRouter(app) {
  // Router
  app.use(auth.parserToken);
  app.use('/api/auth', authRouter);
  // auth.checkAuth
  app.use('/api/payment', paymentRouter);
}

module.exports = { attachRouter };
