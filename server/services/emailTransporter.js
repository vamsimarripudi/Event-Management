let transporterInstance;

const setTransporter = (t) => {
  console.log("SET TRANSPORTER:", t ? "OK" : "NULL");
  transporterInstance = t;
};

const getTransporter = () => {
  console.log("GET TRANSPORTER:", transporterInstance ? "OK" : "NULL");
  if (!transporterInstance) {
    throw new Error("Transporter not initialized");
  }
  return transporterInstance;
};

module.exports = { setTransporter, getTransporter };