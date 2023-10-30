import { checkbox, confirm, select } from '@inquirer/prompts';
import { SUPPORTED_BROWSERS, SUPPORTED_DEVICES, SUPPORTED_OPERATING_SYSTEMS, SUPPORTED_HTTP_VERSIONS } from './constants';

import type { BrowsersType, Device, OperatingSystem, HttpVersion } from 'header-generator';

async function prompt(
    message: string,
    choices: Array<string>,
    method: typeof checkbox | typeof select,
): Promise<any> {
    const answer = await method({
        message,
        choices: choices.map((name) => ({ name, value: name })),
    });
    return answer;
};

async function getBrowsers(): Promise<BrowsersType> {
    return await prompt('Select browsers.', SUPPORTED_BROWSERS, checkbox);
};

async function getDevices(): Promise<Device[]> {
    return await prompt('Select devices.', SUPPORTED_DEVICES, checkbox);
};

async function getOperatingSystems(): Promise<OperatingSystem[]> {
    return await prompt('Select operatings systems.', SUPPORTED_OPERATING_SYSTEMS, checkbox);
};

async function getHttpVersion(): Promise<HttpVersion> {
    return await prompt('Select an Http version.', SUPPORTED_HTTP_VERSIONS, select);
};

async function getMockWebRTC(): Promise<boolean> {
    return await confirm({ message: 'Do you want to mock WebRTC?' })
};

async function generateOptions() {
    return {
        browsers: await getBrowsers(),
        devices: await getDevices(),
        operatingSystems: await getOperatingSystems(),
        httpVersion: await getHttpVersion(),
        mockWebRTC: await getMockWebRTC(),
    };
};

export default generateOptions;
