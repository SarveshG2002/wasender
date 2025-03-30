class Helper {
    constructor(req) {
      this.req = req; // Store the request object to access session data
    }
  
    // Method to clear session error and success messages
    clearErrorSuccess() {
      this.req.session.error = null; // Unset the session error
      this.req.session.success = null; // Unset the session success message
    }
  }
  
  module.exports = Helper;
  