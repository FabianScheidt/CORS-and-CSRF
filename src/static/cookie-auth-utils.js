/**
 * Sends a login request and logs the result
 */
function login(url, withCredentials) {
  const request = new XMLHttpRequest();
  request.withCredentials = withCredentials || false;
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        logString('Login successful');
      } else {
        logString('Login failed');
      }
    }
  }
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({ username: 'admin', password: 'admin' }));
}

/**
 * Sends a logout request and logs the result
 */
function logout(url, withCredentials) {
  const request = new XMLHttpRequest();
  request.withCredentials = withCredentials || false;
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        logString('Logout successful');
      } else {
        logString('Logout failed');
      }
    }
  }
  request.open('POST', url);
  request.send();
}
