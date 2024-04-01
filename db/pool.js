const mysql = require("mysql2/promise");
const {Connector, IpAddressTypes} = require('@google-cloud/cloud-sql-connector');

let pool = null;
let readPool = null;

const setUpPool = async (instanceName) => {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
      instanceConnectionName: instanceName,
      ipType: IpAddressTypes.PUBLIC,
    });
  
    return await mysql.createPool({
      ...clientOpts,
      user: 'root',
      password: 'password',
      database: 'proof-reader-db',
      connectionLimit : 5
    });
}

const getPool = async () => {
  if (!pool) {
    pool = await setUpPool('sfu-cmpt474-24spring-project:us-west1:proof-reader');
  }
  return pool;
};

const getReadPool = async () => {
  if (!readPool) {
    readPool = await setUpPool('sfu-cmpt474-24spring-project:us-west1:proof-reader-replica');
  }
  return readPool;
};

module.exports = {
  getPool,
  getReadPool,
};