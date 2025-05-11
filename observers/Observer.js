class Observer {
    update(message) {
      throw new Error("Observer must implement update()");
    }
  }
  
  module.exports = Observer;
  