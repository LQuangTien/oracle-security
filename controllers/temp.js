const db = require("../helper/db.js");
const { Get } = require("../ulti/response.js");

exports.get = async (req, res) => {
  /** Connect to DB (DO NOT CHANGE THIS) */
  const conn = await db.getConnect();

  try {
    /** Code here */
    const { rows } = await conn.execute(`SELECT * FROM JOBS`);

    /** Close connection (DO NOT CHANGE THIS) */
    await conn.close();

    /** Return response, must include result in brackets { } */
    return Get(res, { rows });
  } catch (error) {
    /** Close connection (DO NOT CHANGE THIS) */
    await conn.close();
  }
};
