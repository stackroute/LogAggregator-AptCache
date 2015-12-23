var fs = require('fs');
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('rawdata/apt-cacher.log')
});
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
log_json = new Array();
var repo = new Object();
var repo_i=new Object();
var repo_o=new Object();
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  timeObj = new Object();
  timeObj["date"] = date;
  timeObj["month"] = month;
  timeObj["year"] = year;
  timeObj["time"] = hour + ':' + min + ':' + sec;
  return timeObj;
}

function writeJson(jsonObj, fileName)
{
  var jsonString = JSON.stringify(jsonObj,null,4);
  fs.writeFileSync(fileName,jsonString);
}

function packageByRepo(repo,tempObj){

  var packages = tempObj["download"].split('/');
  var rep=packages[0];
  var pool=packages[2];
  if(pool==="pool")
  pool=packages[3];
  var packageFile = packages[packages.length-1];
  var packageName=packageFile.split("_")[0];
  var packageVersion=packageFile.split("_")[1];
  if(repo[rep]==undefined)
  {
    repo[rep]={};
  }
  if(repo[rep][pool]==undefined)
  {
    repo[rep][pool]={};
  }
  if(repo[rep][pool][packageFile]==undefined)
  {
    repo[rep][pool][packageFile]={};
    var packageFileName = packageFile.split('_')[0];
    var packageFileVersion = packageFile.split('_')[1];
    repo[rep][pool][packageFile]["Name"] = packageFileName;
    repo[rep][pool][packageFile]["Version"] = packageFileVersion;
  }

  }

function packageCountYearly(line){
  var arr = line.split('|');
  tempObj = new Object();
  var tempTime = timeConverter(parseInt(arr[0]));
  tempObj["date"] = tempTime["date"];
  tempObj["month"] = tempTime["month"];
  tempObj["year"] = tempTime["year"];
  tempObj["time"] = tempTime["time"];
  tempObj["mode"] = arr[1];
  tempObj["size"] = parseInt(arr[2]);
  tempObj["source_ip"] = arr[3];
  tempObj["download"] = arr[4];

  len = tempObj["download"].length;
  if(tempObj["year"]===2015 && tempObj["mode"]=="O" && tempObj["download"].substring(len-4,len ) === ".deb" )
  {
    packageByRepo(repo_o,tempObj);
    }

    else if(tempObj["year"]===2015 && tempObj["mode"]=="I" && tempObj["download"].substring(len-4,len ) === ".deb" ){
      packageByRepo(repo_i,tempObj);

    }

  }

rl.on('line',function(line){
  var arr = line.split('|');
  tempObj = new Object();
  var tempTime = timeConverter(parseInt(arr[0]));
  tempObj["date"] = tempTime["date"];
  tempObj["month"] = tempTime["month"];
  tempObj["year"] = tempTime["year"];
  tempObj["time"] = tempTime["time"];
  tempObj["mode"] = arr[1];
  tempObj["size"] = parseInt(arr[2]);
  tempObj["source_ip"] = arr[3];
  tempObj["download"] = arr[4];
  log_json.push(tempObj);
  packageCountYearly(line);
//  packageCountMonthly(line);
});

rl.on('close',function(){
    var finalresult1=[];

      finalresult1.push(repo_o);

    writeJson(finalresult1,'sample1.json');

    var finalresult2=[];

      finalresult2.push(repo_i);

    writeJson(finalresult2,'sample2.json');

});
