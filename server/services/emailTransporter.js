// services/mailerStore.js

let transporterInstance;

const setTransporter = (transporter) => {
  transporterInstance = transporter;
};

const getTransporter = () => {
  if (!transporterInstance) {
    throw new Error("Transporter not initialized");
  }
  return transporterInstance;
};

module.exports = { setTransporter, getTransporter };