const fs = require('node:fs');

let list = [];
try {
  const str = fs.readFileSync('list.json', 'utf8');
  list = JSON.parse(str);
  console.log(list);
} catch (err) {
  console.error(err);
}

for(let i = 1; i < 40; i++){
  try {
    let data = fs.readFileSync(i+'.txt', 'utf8');
    if(data.includes("world unknown / not registrated"))
      continue;
    data = data.split("\n");
    data = data.reverse();
    data.forEach(item => { 
      let silverSpot = {"x": item.split(";")[2].split("-")[0].trim() - 0,
                        "y": item.split(";")[2].split("-")[1].trim() - 0,
                        "id": item.split(";")[3].trim() - 0};
      if(list.filter(spot => spot.x == silverSpot.x && spot.y == silverSpot.y).length == 0)
        list.push(silverSpot)
    })
  } catch (err) {
    console.error(err);
  }
}
list = list.sort((a,b) => a.x - b.x)
fs.writeFile('list.json', JSON.stringify(list), err => {
  if (err) {
    console.error(err);
  } else {
    console.log("written successfully")
  }
});
