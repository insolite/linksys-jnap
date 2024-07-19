import { encode as b64encode } from 'universal-base64';
import axios, { Axios } from 'axios';
import {
  JNAP_ACTION_BASE_URL,
  JNAP_API_BASE_PATH,
  JNAP_HEADERS,
} from './constants';
import { JnapResponseBody, JnapResponseResult } from './types/api';
import {
  DeviceInfoOutput,
  DevicesOutput,
  NetworkConnectionsOutput,
} from './types/actions';

export interface DeviceOptions {
  /**
   * IP or hostname, optionally with port, e.g. 192.168.1.1
   */
  origin: string;
  /**
   * Auth username, default: admin
   */
  user?: string;
  /**
   * Auth password
   */
  password?: string;
  /**
   * Whether to use HTTPS
   */
  ssl?: boolean;
}

class LinksysDevice {
  readonly axios: Axios;

  private readonly authHeaders: Record<string, string>;

  constructor(options: DeviceOptions) {
    const { origin, user = 'admin', password = '', ssl = false } = options;
    this.authHeaders = {
      [JNAP_HEADERS.AUTHORIZATION]: `Basic ${b64encode(`${user}:${password}`)}`,
    };
    this.axios = new Axios({
      ...axios.defaults,
      baseURL: `http${ssl ? 's' : ''}://${origin}${JNAP_API_BASE_PATH}`,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async action<TOutput = unknown>(action: string, data = {}, auth = true) {
    const response = await this.axios.post<JnapResponseBody<TOutput>>(
      '',
      data,
      {
        headers: {
          [JNAP_HEADERS.ACTION]: `${JNAP_ACTION_BASE_URL}${action}`,
          ...(auth ? this.authHeaders : {}),
        },
      },
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

  getInfo = async () => {
    return await this.action<DeviceInfoOutput>('core/GetDeviceInfo');
  };

  getDevices = async () => {
    return (await this.action<DevicesOutput>('devicelist/GetDevices3')).devices;
  };

  getNetworkConnections = async () => {
    return (
      await this.action<NetworkConnectionsOutput>(
        'networkconnections/GetNetworkConnections2',
      )
    ).connections;
  };
}

export default LinksysDevice;
