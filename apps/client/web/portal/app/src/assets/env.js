(function(window) {
  window.env = window.env || {};

  // API url - In production this should be same-origin
  window.env.apiUrl = window.location ? window.location.origin + '/api' : 'http://localhost:3100/api';

  // Whether or not to enable debug mode
  window.env.enableDebug = true;
}(this));
