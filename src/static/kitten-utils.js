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
 * Tries to read kitten objects from the provided input and logs them
 *
 * @param kittens
 */
function processKittens(kittens) {
  if (kittens) {
    logString(JSON.stringify(JSON.parse(kittens), null, 2));
  } else {
    logString('Failed to fetch Kittens :(');
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
