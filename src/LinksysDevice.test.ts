import { beforeEach, describe, it } from '@jest/globals';
import LinksysDevice from './LinksysDevice';

describe(LinksysDevice.name, () => {
  let device: LinksysDevice;

  beforeEach(() => {
    device = new LinksysDevice({
      origin: '192.168.1.1',
      password: '',
    });
  });

  it('getInfo', async () => {
    const info = await device.getInfo();
    console.log(info);
  });

  it('getDevices', async () => {
    const devices = await device.getDevices();
    console.log(devices);
  });

  it('getNetworkConnections', async () => {
    const connections = await device.getNetworkConnections();
    console.log(connections);
  });

  it('getBackhaulInfo', async () => {
    const devices = await device.getBackhaulInfo();
    console.log(devices);
  });
});
