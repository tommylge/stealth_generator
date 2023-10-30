import yargs from 'yargs';
import fs from 'fs';

import generateOptions from './options';
import generateProfile from './profile';
import { FingerprintGeneratorOptions } from "fingerprint-generator";

const parser = yargs(process.argv.slice(2)).options({
    cli: { type: "boolean", default: false },
    outputDir: { type: "string", demandOption: false },
});

const argv = await parser.argv;

async function cli() {
    const { outputDir } = argv;
    const options = await generateOptions();
    const { injectable_code, fingerprint } = generateProfile(options);
    console.log('Saving injectable_code.js and fingerprint.js');

    if (outputDir) {
        if (!fs.existsSync(outputDir))
            throw new Error('Make sure the output directory already exists.');
    };

    await Bun.write(`${outputDir}/injectable_code.js`, injectable_code);
    await Bun.write(`${outputDir}/fingerprint.js`, JSON.stringify(fingerprint));
};

if (argv.cli) {
    cli();
} else {
    const server = Bun.serve({
        port: 3000,
        fetch(req) {
            const { body }: any = req;
            const options: Partial<FingerprintGeneratorOptions> = body;
            const { injectable_code, fingerprint } = generateProfile(options);

            const responseContent = {
                injectable_code: injectable_code,
                fingerprint: fingerprint,
            };

            return new Response(JSON.stringify(responseContent), {
                headers: {
                    "content-type": "application/json",
                },
            });
        },
    });

    console.log(`Listening on http://localhost:${server.port} ...`);
};
