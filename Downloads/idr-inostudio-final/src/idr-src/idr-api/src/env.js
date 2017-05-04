/* eslint-disable no-console */

// Helper function that registers required environment variables.
// If anything is missing, then the entire app will exit with code 1--
// signaling that it crashed due to a missing/required field
module.exports = function checkEnv(...envs) {
  for (const env of envs) {
    if (!Object.keys(process.env).includes(env)) {
      console.log(`Missing environment: ${env}`);
      process.exit(1);
    }
  }
};
