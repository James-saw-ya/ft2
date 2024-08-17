const fs = require('node:fs');

let list = [];
try {
  list = fs.readFileSync('list.json', 'utf8');
} catch (err) {
  console.error(err);
}

for(let i = 0; i < 40; i++){
  try {
    let data = fs.readFileSync(i+'.txt', 'utf8');
    data = data.split("\n");
    data.forEach(item => 
      let silverSpot = {"x": item.split(";")[2].split("-")[0].trim() - 0, "x": item.split(";")[2].split("-")[1].trim() - 0};
      if(list.filter(spot => spot.x == silverSpot.x && spot.y == silverSpot.y).length == 0)
        list.push(silverSpot)
    )
  } catch (err) {
    console.error(err);
  }
}

fs.writeFile('list.json', JSON.stringify(list), err => {
  if (err) {
    console.error(err);
  } else {
    console.log("written successfully")
  }
});
