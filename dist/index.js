'use strict';

var universalBase64 = require('universal-base64');
var axios = require('axios');

const JNAP_HEADER_PREFIX = "X-JNAP-";
const JNAP_HEADERS = {
  ACTION: `${JNAP_HEADER_PREFIX}Action`,
  AUTHORIZATION: `${JNAP_HEADER_PREFIX}Authorization`
};
const JNAP_API_BASE_PATH = "/JNAP/";
const JNAP_ACTION_BASE_URL = "http://linksys.com/jnap/";

var JnapResponseResult = /* @__PURE__ */ ((JnapResponseResult2) => {
  JnapResponseResult2["OK"] = "OK";
  return JnapResponseResult2;
})(JnapResponseResult || {});

class LinksysDevice {
  constructor(options) {
    this.getInfo = async () => {
      return await this.action("core/GetDeviceInfo");
    };
    this.getDevices = async () => {
      return (await this.action("devicelist/GetDevices3")).devices;
    };
    this.getNetworkConnections = async () => {
      return (await this.action(
        "networkconnections/GetNetworkConnections2"
      )).connections;
    };
    this.getBackhaulInfo = async () => {
      return (await this.action(
        "nodes/diagnostics/GetBackhaulInfo"
      )).backhaulDevices;
    };
    const { origin, user = "admin", password = "", ssl = false } = options;
    this.authHeaders = {
      [JNAP_HEADERS.AUTHORIZATION]: `Basic ${universalBase64.encode(`${user}:${password}`)}`
    };
    this.axios = new axios.Axios({
      ...axios.defaults,
      baseURL: `http${ssl ? "s" : ""}://${origin}${JNAP_API_BASE_PATH}`,
      headers: {
        Accept: "application/json"
      }
    });
  }
  async action(action, data = {}, auth = true) {
    const response = await this.axios.post(
      "",
      data,
      {
        headers: {
          [JNAP_HEADERS.ACTION]: `${JNAP_ACTION_BASE_URL}${action}`,
          ...auth ? this.authHeaders : {}
        }
      }
    );
    const { status, data: responseData } = response;
    if (status >= 400) {
      throw new Error(`Response code is ${status}`);
    }
    if (responseData?.result !== JnapResponseResult.OK) {
      throw new Error(`Response result is "${responseData?.result}"`);
    }
    return responseData?.output;
  }
}

exports.LinksysDevice = LinksysDevice;
