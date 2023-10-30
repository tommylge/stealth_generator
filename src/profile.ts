import { FingerprintInjector }  from 'fingerprint-injector';
import { FingerprintGenerator } from 'fingerprint-generator';
import { FingerprintGeneratorOptions } from 'fingerprint-generator';


function generateProfile(options: Partial<FingerprintGeneratorOptions>) {
    const injector = new FingerprintInjector();
    const generator = new FingerprintGenerator();
    const fingerprint = generator.getFingerprint(options);
    const injectable_code = injector['getInjectableScript'](fingerprint);
    return { injectable_code, fingerprint };
}

export default generateProfile;
