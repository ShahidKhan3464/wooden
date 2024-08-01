import getAuthToken from "./getAuthToken";

const request = require("request");

const base_url = 'https://woodendoordev.com'
function api(uri = "/oauth/token", data = {}, method = "GET", check=false) {



  const authToken = getAuthToken();

  let isErrorStatusCode = (statusCode) => {
    //if 401 refresh token
    return (
      statusCode === 401 ||
      statusCode === 400 ||
      statusCode === 500 ||
      statusCode === 404
    );
  };
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (authToken) {
    headers.Authorization = "Bearer " + authToken;
  }

  var options = {
    method: method,
    url: base_url + uri,
    headers: headers
  };
  if (check) {
    options = {
      ...options,
      json: true,
      body: data
    }
  } else {
    options = {
      ...options,
      form: data
    }
  }

  
 
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      let statusCode = response?.statusCode;


      if (error || isErrorStatusCode(statusCode)) {
      
        return reject(response);
      }
      response = response.toJSON();

      let responseBody = JSON.parse(response.body);

      return resolve(responseBody);
    });
  });


}

export default api;
