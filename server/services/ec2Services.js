// services/ssmService.js
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const client = new SSMClient({ region: "ap-south-1" });

const cache = {};

const getSecret = async (name) => {
  if (cache[name]) return cache[name];

  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  });

  const response = await client.send(command);
  const value = response.Parameter.Value;

  cache[name] = value;
  return value;
};

module.exports = {getSecret};