import { Axios } from 'axios';

type UUID = string;
type MacAddress = string;
type IPV4 = string;
type IPV6 = string;
type ISODateTime = string;

type DeviceID = UUID;
type Band = '2.4GHz' | '5GHz' | string;
type InterfaceType = 'Wireless' | 'Wired' | 'Unknown' | string;
interface DeviceModel {
    manufacturer: string;
    modelNumber: string;
    hardwareVersion: string;
    description: string;
}
interface DeviceUnit {
    serialNumber: string;
    firmwareVersion: string;
    firmwareDate: string;
}
interface DeviceInfo extends DeviceModel, DeviceUnit {
    services: string[];
}
type DeviceInfoOutput = DeviceInfo;
interface Device {
    deviceID: DeviceID;
    lastChangeRevision: number;
    model: DeviceModel & {
        deviceType: 'Infrastructure' | 'Mobile' | 'Computer' | 'MediaPlayer' | '' | string;
    };
    unit: Partial<DeviceUnit> & {
        operatingSystem?: 'Android' | 'Windows' | string;
    };
    isAuthority: boolean;
    nodeType: 'Master' | 'Slave' | string;
    isHomeKitSupported?: boolean;
    friendlyName: string;
    knownInterfaces: {
        macAddress: MacAddress;
        interfaceType: InterfaceType;
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
interface DevicesOutput {
    revision: number;
    devices: Device[];
    deletedDeviceIDs: DeviceID[];
}
interface NetworkConnection {
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
interface NetworkConnectionsOutput {
    connections: NetworkConnection[];
}
interface BackhaulDevice {
    deviceUUID: DeviceID;
    ipAddress: IPV4;
    parentIPAddress: IPV4;
    connectionType: InterfaceType;
    wirelessConnectionInfo?: {
        radioID: string;
        channel: number;
        apRSSI: number;
        stationRSSI: number;
        apBSSID: MacAddress;
        stationBSSID: MacAddress;
    };
    speedMbps: string;
    timestamp: ISODateTime;
}

interface DeviceOptions {
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
declare class LinksysDevice {
    readonly axios: Axios;
    private readonly authHeaders;
    constructor(options: DeviceOptions);
    action<TOutput = unknown>(action: string, data?: {}, auth?: boolean): Promise<TOutput>;
    getInfo: () => Promise<DeviceInfo>;
    getDevices: () => Promise<Device[]>;
    getNetworkConnections: () => Promise<NetworkConnection[]>;
    getBackhaulInfo: () => Promise<BackhaulDevice[]>;
}

declare enum JnapResponseResult {
    OK = "OK"
}
interface JnapResponseBody<TOutput = unknown> {
    result: JnapResponseResult | string;
    output: TOutput;
}

export { type Band, type Device, type DeviceID, type DeviceInfo, type DeviceInfoOutput, type DeviceModel, type DeviceUnit, type DevicesOutput, type JnapResponseBody, JnapResponseResult, LinksysDevice, type NetworkConnection, type NetworkConnectionsOutput };
