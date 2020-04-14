/**
 * Performs a GET request to the provided urls and processes the response as kittens
 *
 * @param url
 * @param withCredentials
 */
function fetchKittens(url, withCredentials) {
  const request = new XMLHttpRequest();
  request.withCredentials = withCredentials || false;
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      processKittens(request.response);
    }
  }
  request.open('GET', url);
  request.send();
}

/**
 * Performs a POST request to the provided url to store an array of kittens.
 * Processes the response as kittens.
 *
 * @param kittens
 * @param url
 * @param withCredentials
 */
function saveKittens(kittens, url, withCredentials) {
  const request = new XMLHttpRequest();
  request.withCredentials = withCredentials || false;
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      processKittens(request.response);
    }
  }
  request.open('POST', url);
  request.send(JSON.stringify(kittens));
}

/**
 * Calls saveKittens with the value of the DOM element with the id "kittens"
 *
 * @param url
 * @param withCredentials
 */
function saveTextareaKittens(url, withCredentials) {
  const kittens = document.getElementById('kittens').value;
  saveKittens(JSON.parse(kittens), url, withCredentials);
}

/**
 * Tries to read kitten objects from the provided input and logs them
 *
 * @param kittens
 */
function processKittens(kittens) {
  try {
    logString(JSON.stringify(JSON.parse(kittens), null, 2));
  } catch (e) {
    logString(kittens || 'Failed to fetch Kittens :(');
  }

}

/**
 * Logs a string to the first pre element in the document
 *
 * @param string
 */
function logString(string) {
  const element = document.getElementsByTagName('pre').item(0);
  element.innerText = string;
}
