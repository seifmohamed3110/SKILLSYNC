const Observer = require('./Observer');

class SMSNotifier extends Observer {
  update(message) {
    console.log(`SMS Notification: ${message}`);
  }
}

module.exports = SMSNotifier;
