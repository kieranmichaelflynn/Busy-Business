const { connect } = require("../database/connect");



async function createDepartment(name){

  const connecion = await connect();


  const query = `INSERT INTO \`departments\` (\`name\`) VALUES ('${name}');`
  return connecion.execute(query);

}


module.exports = {
  createDepartment
}

