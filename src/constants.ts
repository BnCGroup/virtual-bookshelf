// https://medium.com/@peterpme/environment-variables-in-expo-using-release-channels-4934594c5307
import { Constants } from 'expo';

const ENV = {
  dev: {
    apiUrl: 'https://08ijseiv87.execute-api.us-west-2.amazonaws.com/dev',
  },

  stage: {
    apiUrl: '',
  },

  prod: {
    apiUrl: '',
  },
};

function getEnvVars(env = '') {
  if (env.indexOf('stage') !== -1) {
    return ENV.stage;
  }

  if (env.indexOf('prod') !== -1) {
    return ENV.prod;
  }

  return ENV.dev;
}

export default getEnvVars(Constants.manifest.releaseChannel);
