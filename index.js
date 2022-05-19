const fs = require("fs");
csv = fs.readFileSync("input.csv");

let array = csv.toString().split("\r");

let headers = array[0].toString().replaceAll('"', "").split(",");
array.shift();

let valuesRegExp = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g;

let elements = [];

for (let i = 0; i < array.length; i++) {
    let element = {};
    let j = 0;
    let line = array[i].replace(/^(?=,)|(?<=,)(?=,|$)/g,' ').replaceAll('\n','')
    
  while ((matches = valuesRegExp.exec(line))) {

    let value = matches[1] || matches[2];
    value = value.replace(/\"\"/g, "\"").replace(/\//g,',');


    if (Object.keys(element).includes(headers[j])) {
        let a = new Array();
        if(element[headers[j]].toString().includes(',')){
            let c = new Array();
            element[headers[j]].toString().split(',').map(item=>{c.push(item)})
            a = [...c, value];
            element[headers[j]] = a;
        }else{
            let b= element[headers[j]].toString();
            a = [b, value];
            element[headers[j]] = a;
        }       
      } else {
          
        if(value.toString().includes(',')){
            let c = new Array();
            value.toString().split(',').map(item=> {c.push(item)})
            c = [...c];
            element[headers[j]] = c;
        }else{
            element[headers[j]] =  value;
        } 
       
      }
    j++;
  }

  elements.push(element);
}

console.log(elements);
let json = JSON.stringify(elements);
fs.writeFileSync("output.json", json);
