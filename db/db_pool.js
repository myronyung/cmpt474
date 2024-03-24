const mysql = require("mysql2/promise");
const {Connector, IpAddressTypes} = require('@google-cloud/cloud-sql-connector');

const setUpPool = async () => {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
      instanceConnectionName: 'sfu-cmpt474-24spring-project:us-west1:proof-reader',
      ipType: IpAddressTypes.PUBLIC,
    });
  
    const pool = await mysql.createPool({
      ...clientOpts,
      user: 'root',
      password: 'password',
      database: 'proof-reader-db',
    });
  
    return pool;
}

let conn;
const getConn = async () => {
  const pool = await setUpPool();
  conn = await pool.getConnection();
};

module.exports = {
  getConn,
  conn
};