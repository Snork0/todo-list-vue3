import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Call specific GET API. If success handle status code
 * if @var options.alert.success is true and return response, otherwise handle
 * error if @var options.alert.failure is not false and throw error.
 * @param {String} url API path
 * @param {Object} options Can contain the following keys:
 *   @prop {Object} options.alert Sets toast messages.
 *     @prop {Boolean} alert.success Show/Hide success response toast message.
 *     @prop {Boolean} alert.failure Show/Hide error toast message.
 *   @prop {Boolean} options.auth Sets a "Authorization" header with a "Bearer"
 *   token stored in "localStorage" under the key "authorization" in each axios
 *   call. If equal to false, the Authorization header will not be set.
 *   @prop {Object} options.headers The headers mentioned in this object will
 *   be set via @function setHeader() to the axios call.
 *   @prop {String} options.responseType Set the response type to axios call
 *   options. If it is not filled in, will be set to the default value "json".
 *
 * @returns {Promise} response or error from API
 */
export async function get(url, options = {}) {
  return await axiosClient
    .get(url, {
      headers: setHeader(options.headers, options.auth),
      responseType: options.responseType || "json",
    })
    .then((response) => {
      if (options.alert && options.alert.success) {
        console.log(response);
      }
      return response;
    })
    .catch((error) => {
      if (!options.alert || options.alert.failure !== false) {
        console.error(error);
      }
      throw error;
    });
}

/**
 * Call specific POST API. If success handle status code
 * if @var options.alert.success is not false and return response, otherwise
 * handle error if @var options.alert.failure is not false and throw error.
 * @param {String} url API path
 * @param {Object} body Payload, default is null
 * @param {Object} options Can contain the following keys:
 *   @prop {Object} options.alert Sets toast messages.
 *     @prop {Boolean} alert.success Show/Hide success response toast message.
 *     @prop {Boolean} alert.failure Show/Hide error toast message.
 *   @prop {Boolean} options.auth Sets a "Authorization" header with a "Bearer"
 *   token stored in "localStorage" under the key "authorization" in each axios
 *   call. If equal to false, the Authorization header will not be set.
 *   @prop {Object} options.headers The headers mentioned in this object will
 *   be set via @function setHeader() to the axios call.
 *   @prop {String} options.responseType Set the response type to axios call
 *   options. If it is not filled in, will be set to the default value "json".
 *
 * @returns {Promise} response or error from API
 */
export async function post(url, body = null, options = {}) {
  return await axiosClient
    .post(url, body, { headers: setHeader(options.headers, options.auth) })
    .then((response) => {
      if (!options.alert || options.alert.success !== false) {
        console.log(response);
      }
      return response;
    })
    .catch((error) => {
      if (!options.alert || options.alert.failure !== false) {
        console.error(error);
      }
      throw error;
    });
}

/**
 * Call specific PUT API. If success handle status code
 * if @var options.alert.success is true and return response, otherwise handle
 * error if @var options.alert.failure is not false and throw error.
 * @param {String} url API path
 * @param {Object} body Payload
 * @param {Object} options Can contain the following keys:
 *   @prop {Object} options.alert Sets toast messages.
 *     @prop {Boolean} alert.success Show/Hide success response toast message.
 *     @prop {Boolean} alert.failure Show/Hide error toast message.
 *   @prop {Boolean} options.auth Sets a "Authorization" header with a "Bearer"
 *   token stored in "localStorage" under the key "authorization" in each axios
 *   call. If equal to false, the Authorization header will not be set.
 *   @prop {Object} options.headers The headers mentioned in this object will
 *   be set via @function setHeader() to the axios call.
 *   @prop {String} options.responseType Set the response type to axios call
 *   options. If it is not filled in, will be set to the default value "json".
 *
 * @returns {Promise} response or error from API
 */
export async function put(url, body, options = {}) {
  return await axiosClient
    .put(url, body, { headers: setHeader(options.headers, options.auth) })
    .then((response) => {
      if (options.alert && options.alert.success) {
        console.log(response);
      }
      return response;
    })
    .catch((error) => {
      if (!options.alert || options.alert.failure !== false) {
        console.error(error);
      }
      throw error;
    });
}

/**
 * Call specific POST API. If success handle status code
 * if @var options.alert.success is not false and return response, otherwise
 * handle error if @var options.alert.failure is not false and throw error.
 * @param {String} url API path
 * @param {Object} options Can contain the following keys:
 *   @prop {Object} options.alert Sets toast messages.
 *     @prop {Boolean} alert.success Show/Hide success response toast message.
 *     @prop {Boolean} alert.failure Show/Hide error toast message.
 *   @prop {Boolean} options.auth Sets a "Authorization" header with a "Bearer"
 *   token stored in "localStorage" under the key "authorization" in each axios
 *   call. If equal to false, the Authorization header will not be set.
 *   @prop {Object} options.headers The headers mentioned in this object will
 *   be set via @function setHeader() to the axios call.
 *   @prop {String} options.responseType Set the response type to axios call
 *   options. If it is not filled in, will be set to the default value "json".
 *
 * @returns {Promise} response or error from API
 */
export async function destroy(url, options = {}) {
  return await axiosClient
    .delete(url, { headers: setHeader(options.headers, options.auth) })
    .then((response) => {
      if (!options.alert || options.alert.success !== false) {
        console.log(response);
      }
      return response;
    })
    .catch((error) => {
      if (!options.alert || options.alert.failure !== false) {
        console.error(error);
      }
      throw error;
    });
}

/**
 * Set custom headers options or use default.
 * @param {Object} headers Custom headers. Content-Type: application/json by
 * default.
 * @param {Boolean} auth Authorization header true/false. True by default (False for this project).
 * @returns {Object} headers
 */
function setHeader(headers, auth = false) {
  if (auth) {
    headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("authorization")).Token
    }`;
  }

  return headers;
}

export default {
  get,
  post,
  put,
  destroy,
};