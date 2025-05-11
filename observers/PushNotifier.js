const Observer = require('./Observer');

class PushNotifier extends Observer {
  update(message) {
    console.log(`Push Notification: ${message}`);
    // Here, you'd integrate with services like Firebase Cloud Messaging (FCM) or OneSignal
  }
}

module.exports = PushNotifier;
