const mysql = require("mysql2/promise");
const {Connector, IpAddressTypes} = require('@google-cloud/cloud-sql-connector');

let pool = null
const setUpPool = async () => {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
      instanceConnectionName: 'sfu-cmpt474-24spring-project:us-west1:proof-reader',
      ipType: IpAddressTypes.PUBLIC,
    });
  
    pool = await mysql.createPool({
      ...clientOpts,
      user: 'root',
      password: 'password',
      database: 'proof-reader-db',
      connectionLimit : 5
    });
  }

const getPool = async () => {
  if (!pool) {
    await setUpPool();
  }
  return pool;
};

module.exports = {
  setUpPool,
  getPool
};