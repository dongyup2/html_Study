
main();

function main(){
  loadJsonFile()
  .then(result => {
    console.log(result);
  })
}
async function loadJsonFile(){
    let response = await fatch("/json/json/user.json")
    return response;
}