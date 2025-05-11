const Observer = require('./Observer');

class EmailNotifier extends Observer {
  update(message) {
    console.log(`Email Notification: ${message}`);
  }
}

module.exports = EmailNotifier;
