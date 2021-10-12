// HTTP Client for connecting to Node Backend

const API_BASE = "http://localhost/api";

export default class HTTPClient {
  static errorHandler(error) {
    error = error.response ? error.response.data : error;
    return Promise.reject(error);
  }

  static async successHandler(response) {
    if(response.statusText !== "OK")
      return Promise.reject(response.status);
    return response;
  }

  static get(url) {
    return fetch(`${API_BASE}${url}`)
      .then(this.successHandler)
      .catch(this.errorHandler);
  }

  static post(url, body) {
    const req = JSON.stringify(body)
    return fetch(`${API_BASE}${url}`, {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: req
    })
      .then(this.successHandler)
      .catch(this.errorHandler);
  }

  static put(url, body){
    const req = JSON.stringify(body)
    return fetch(`${API_BASE}${url}`, {
      method:'PUT',
      headers: {'Content-Type': 'application/json'},
      body: req
    })
      .then(this.successHandler)
      .catch(this.errorHandler);
  }

  static delete(url){
    return fetch(`${API_BASE}${url}`, {
      method:'DELETE'
    })
      .then(this.successHandler)
      .catch(this.errorHandler);
  }
}