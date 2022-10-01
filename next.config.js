const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "dbUser",
        mongodb_password: "rGlbGaMetb1RykIO",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site-dev",
      },
    };
  }
  return {
    env: {
      mongodb_username: "dbUser",
      mongodb_password: "rGlbGaMetb1RykIO",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
  };
};
