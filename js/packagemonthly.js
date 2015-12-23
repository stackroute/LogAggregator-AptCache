var fs = require('fs');
var r1 = require('readline').createInterface({
  input: require('fs').createReadStream('../rawdata/apt-cacher.log')
});

var containarray  = new Array();
var newarray = new Array();
var mainObj = new Object();
var i=1;
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
r1.on('line', function(line){


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
  if(tempObj["year"]===2015 && tempObj["mode"]==="O" && tempObj["download"].substring(len-4,len ) === ".deb" )
  {

    var packageFile = tempObj["download"].split('/')[5];
    var month = tempObj["month"];
    if(packageFile!=undefined)
    {

      if(mainObj[month]===undefined)
      {
        mainObj[month]={};
        if(mainObj[month][packageFile]===undefined)
        {
          mainObj[month][packageFile]={};
          var packageFileName = packageFile.split('_')[0];
          var packageFileVersion = packageFile.split('_')[1];
          if(packageFileVersion!=undefined)
          var packageFileArch = packageFile.split('_')[2].split('.')[0];
          mainObj[month][packageFile]["Package Name"] = packageFileName;
          mainObj[month][packageFile]["Package Version"] = packageFileVersion;
          mainObj[month][packageFile]["Package Architecture"] = packageFileArch;
          mainObj[month][packageFile]["Count"]=1;
        }

      }
      else {
        if(mainObj[month][packageFile]===undefined)
        {
          mainObj[month][packageFile]={};
          var packageFileName = packageFile.split('_')[0];
          var packageFileVersion = packageFile.split('_')[1];
          if(packageFileVersion!=undefined)
          var packageFileArch = packageFile.split('_')[2].split('.')[0];
          mainObj[month][packageFile]["Package Name"] = packageFileName;
          mainObj[month][packageFile]["Package Version"] = packageFileVersion;
          mainObj[month][packageFile]["Package Architecture"] = packageFileArch;
          mainObj[month][packageFile]["Count"]=1;
        }
        else {
          mainObj[month][packageFile]["Count"]++;
        }
      }
    }
  }

});


r1.on('close', function(){


  for(i in mainObj)
  {
    var finalresult=[];
    for(j in mainObj[i])
    {
      finalresult.push(mainObj[i][j])
    }
    fs.writeFile("../json/package/"+i+".json",JSON.stringify(finalresult,null,4),function(err,data){
            if(err){
              return console.log(err);
            }

          });
  }
});
