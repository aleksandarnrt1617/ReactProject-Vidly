import Raven from "raven-js";

function init() {
  Raven.config("https://1621ebd9054e4e349d2dd9c2bdb18ce1@o430947.ingest.sentry.io/5380591", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};