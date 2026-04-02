(function(window) {
  window.env = window.env || {};

  // API url - In production this should be same-origin
  window.env.apiUrl = '/api';

  // Whether or not to enable debug mode
  window.env.enableDebug = true;
}(this));
