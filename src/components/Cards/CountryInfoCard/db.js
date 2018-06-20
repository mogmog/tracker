const { Pool } = require('pg')

const connectionString = 'postgresql://postgres:postgres@localhost:5432/tracker'

const pool = new Pool({
  connectionString: connectionString,
})

async function getCountryData(x) {
  const { rows } = await pool.query ("SELECT factbook, map from country where factbook ->>'name' = '" + x + "'");
  return rows[0];
}

async function createCard(obj) {
  const { rows } = await pool.query (`INSERT INTO cards (component, key, data) VALUES ('${obj.component}', '${JSON.stringify(obj.key)}', '${JSON.stringify(obj.data)}'); `);
  return rows[0];
}


async function addAsync(country) {

  const factbook  = (await getCountryData(country))['factbook'];
  const map       = (await getCountryData(country))['map'];

  return { factbook, map };
}

function mergeObject (obj) {
  return (data) => {
    obj.data = data;
    return obj;
  }

}


module.exports = {
  query: (text, params) => pool.query(text, params),
  addAsync: addAsync,
  mergeObject : mergeObject,
  createCard : createCard


}
