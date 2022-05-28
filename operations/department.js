const { connect } = require("../database/connect");

async function createDepartment(name){

  const connection = await connect();

  const query = `INSERT INTO \`departments\` (\`name\`) VALUES ('${name}');`
  return connection.execute(query);

}

// async function getDepartments(){

//   const connection = await connect();

//   const query = `SELECT id, name FROM departments;`
//   return connection.execute(query)
// //     , (err, data)=>{

    
// //         const names = data.map(department=> {return `${department.name}`})
// //         return names
// //   })
      
    
// //     return names
// }

const getDepartments = async () => {
  const connection = await connect()
  const query = `SELECT id, name FROM departments;`
   return connection.execute(query, (err, result) => {
     if (err) throw err;
       console.log(result);
   });
  // , (err, data) => {
    
  // });
};


module.exports = {
  createDepartment,
  getDepartments
}