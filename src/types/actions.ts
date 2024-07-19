import { UUID, MacAddress, IPV4, IPV6 } from './core';

export type DeviceID = UUID;
export type Band = '2.4GHz' | '5GHz' | string;

export interface DeviceModel {
  manufacturer: string;
  modelNumber: string;
  hardwareVersion: string;
  description: string;
}

export interface DeviceUnit {
  serialNumber: string;
  firmwareVersion: string;
  firmwareDate: string;
}

// core/GetDeviceInfo

export interface DeviceInfo extends DeviceModel, DeviceUnit {
  services: string[];
}

export type DeviceInfoOutput = DeviceInfo;

// devicelist/GetDevices3

export interface Device {
  deviceID: DeviceID;
  lastChangeRevision: number;
  model: DeviceModel & {
    deviceType:
      | 'Infrastructure'
      | 'Mobile'
      | 'Computer'
      | 'MediaPlayer'
      | ''
      | string;
  };
  unit: Partial<DeviceUnit> & {
    operatingSystem?: 'Android' | 'Windows' | string;
  };
  isAuthority: boolean;
  friendlyName: string;
  knownInterfaces: {
    macAddress: MacAddress;
    interfaceType: 'Wireless' | 'Wired' | 'Unknown' | string;
    band?: Band;
  }[];
  connections: {
    macAddress: MacAddress;
    ipAddress: IPV4;
    ipv6Address?: IPV6;
    parentDeviceID?: DeviceID;
  }[];
  properties: {
    name: 'userDeviceName' | 'userDeviceType' | string;
    value: string;
  }[];
  maxAllowedProperties: number;
}

export interface DevicesOutput {
  revision: number;
  devices: Device[];
  deletedDeviceIDs: DeviceID[];
}

// networkconnections/GetNetworkConnections2

export interface NetworkConnection {
  macAddress: MacAddress;
  negotiatedMbps: number;
  wireless?: {
    bssid: MacAddress;
    isGuest: boolean;
    radioID: string;
    band: Band;
    signalDecibels: number;
  };
}

export interface NetworkConnectionsOutput {
  connections: NetworkConnection[];
}
