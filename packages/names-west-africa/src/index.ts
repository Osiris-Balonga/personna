import { NameRegistry } from '@personna/core';
import { WestAfricaNameProvider } from './provider';

// Export provider for manual usage
export { WestAfricaNameProvider } from './provider';

// Export raw data for advanced usage
export { SN_NAMES } from './data/sn';
export { CI_NAMES } from './data/ci';
export { NG_NAMES } from './data/ng';
export { GH_NAMES } from './data/gh';
export { ML_NAMES } from './data/ml';

// Auto-register on import
const provider = new WestAfricaNameProvider();
NameRegistry.register(provider);
