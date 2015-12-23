var fs = require('fs');
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('rawdata/apt-cacher.log')
});

jsonString = fs.readFileSync("json/apt-cacher.json");
var logObj = JSON.parse(jsonString);
var LENGTH = logObj.length;
datapack = new Array();
d=new Object();
for(var i=0; i<LENGTH; i++)
{
  len=logObj[i]["download"].length;
  if(logObj[i]["download"].substr(len-4,len)===(".deb")){
    d=new Object();
    d["mode"]=logObj[i]["mode"];
    d["pack"]=logObj[i]["download"];
    datapack.push(d);

  }
}

var jsonString = JSON.stringify(datapack,null,4);
fs.writeFileSync("sample.json",jsonString);

jsonString = fs.readFileSync("sample.json");
var logObj1 = JSON.parse(jsonString);
var LENGTH = logObj1.length;
console.log(LENGTH);
data= new Array();
for(var i=0; i<LENGTH; i++)
{
  line=logObj1[i]["pack"].split("/");
  n=line.length;
  temp=new Object();
  for(j=0;j<n;j++){
    temp["rep"]=line[0];
    temp["pool"]=line[2];
    temp["pack"]=line[n-1];

  }
data.push(temp);
}


var jsonString = JSON.stringify(data,null,1);
fs.writeFileSync("sample1.json",jsonString);
