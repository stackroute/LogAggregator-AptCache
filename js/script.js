var fs = require('fs');
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('../rawdata/apt-cacher.log')
});
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
log_json = new Array();
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
function calculateLogMonth(fileName)
{
    log_no_i = new Object();
    log_no_o = new Object();
    data_i = new Object();
    data_o = new Object();
    data_o_package= new Object();
    data_i_package= new Object();
    log_no_meta = new Object();
    log_no_pack = new Object();
    data_i_metadata= new Object();
    data_o_metadata= new Object();
    for(var i=0; i<months.length; i++)
    {
        log_no_i[months[i]]=0;
        log_no_o[months[i]]=0;
        data_i[months[i]]=0;
        data_o[months[i]]=0;
        data_o_metadata[months[i]]=0;
        data_o_package[months[i]]=0;
        log_no_meta[months[i]]=0;
        log_no_pack[months[i]]=0;
        data_i_metadata[months[i]]=0;
        data_i_package[months[i]]=0;
    }
    jsonString = fs.readFileSync(fileName);
    var logObj = JSON.parse(jsonString);
    var LENGTH = logObj.length;
    for(var i=0; i<LENGTH; i++)
      {   var len=logObj[i]['download'].length;
        if(logObj[i]["mode"]==="O")
        {

            log_no_o[logObj[i]["month"]]++;
            data_o[logObj[i]["month"]]+=logObj[i]["size"];

            if(logObj[i]['download'].substring(len-4,len ) === ".deb")
            {
             data_o_package[logObj[i]["month"]]+=logObj[i]["size"];
            }
            else {

                data_o_metadata[logObj[i]["month"]]+=logObj[i]["size"];

            }

        }
        else
        {
          if(logObj[i]['download'].substring(len-4,len ) === ".deb")
          {
           data_i_package[logObj[i]["month"]]+=logObj[i]["size"];
          }
          else {

              data_i_metadata[logObj[i]["month"]]+=logObj[i]["size"];

          }

            log_no_i[logObj[i]["month"]]++;
            data_i[logObj[i]["month"]]+=logObj[i]["size"];
        }
        var len = logObj[i]["download"].length;
        if(logObj[i]["download"].substring(len-4,len) === ".deb")
        {
            log_no_pack[logObj[i]["month"]]++;
        }
        else
        {
            log_no_meta[logObj[i]["month"]]++;
        }
    }
    finalArr = new Array();
    dataArr = new Array();
    dataFilterPackage=new Array();
    finalArrPack = new Array();
    dataFilterMetadata=new Array();
    for(mon in log_no_i)
    {
        tempObj = new Object();
        tempObj1 = new Object();
        tempObj2 = new Object();
        tempObj3 = new Object();
        tempObj4 = new Object();
        tempObj["period"] = mon;
        tempObj["Input"] = log_no_i[mon];
        tempObj["Output"] = log_no_o[mon];
        finalArr.push(tempObj);
        tempObj1["period"] = mon;
        tempObj1["Input"] = data_i[mon];
        tempObj1["Output"] = data_o[mon];
        dataArr.push(tempObj1);
        tempObj2["period"] = mon;
        tempObj2["Packages"] = log_no_pack[mon];
        tempObj2["Metadata"] = log_no_meta[mon];
        finalArrPack.push(tempObj2);

        tempObj3["period"] = mon;
        tempObj3["Input"] = data_i_package[mon];
        tempObj3["Output"] = data_o_package[mon];
        dataFilterPackage.push(tempObj3);

        tempObj4["period"] = mon;
        tempObj4["Input"] = data_i_metadata[mon];
        tempObj4["Output"] = data_o_metadata[mon];
        dataFilterMetadata.push(tempObj4);

    }
    writeJson(finalArr,'../json/rate/monthwise_log.json');
    writeJson(dataArr,'../json/size/all/monthwise_data_all.json');
    writeJson(dataFilterPackage,'../json/size/package/monthwise_data_package.json');
    writeJson(finalArrPack,'../json/rate_pack/monthwise_data.json');
    writeJson(dataFilterMetadata,'../json/size/metadata/monthwise_data_metadata.json');

}
function calculateLogDay(fileName)
{
    var even = ["Apr","Jun","Sep","Nov"];
    var odd = ["Jan",'Mar','May','Jul','Aug','Oct','Dec'];
    jsonString = fs.readFileSync(fileName);
    var logObj = JSON.parse(jsonString);
    var LENGTH = logObj.length;
    logs_no_i = new Object();
    logs_no_o = new Object();
    data_i = new Object();
    data_o = new Object();
    data_o_package=new Object();
    data_o_metadata=new Object();
    log_no_meta = new Object();
    log_no_pack = new Object();
    data_i_package=new Object();
    data_i_metadata=new Object();

    for(var i=0; i<months.length; i++)
    {
        logs_no_i[months[i]] = new Object();
        logs_no_o[months[i]] = new Object();
        data_i[months[i]] = new Object();
        data_o[months[i]] = new Object();
        data_i_package[months[i]] = new Object();
        data_o_package[months[i]] = new Object();
        log_no_meta[months[i]] = new Object();
        log_no_pack[months[i]] = new Object();
        data_o_metadata[months[i]] = new Object();
        data_i_metadata[months[i]] = new Object();

        if(even.indexOf(months[i])>-1)
        {
            for(var j=1; j<=30; j++)
            {
                logs_no_i[months[i]][j+""]=0;
                logs_no_o[months[i]][j+""]=0;
                data_i[months[i]][j+""]=0;
                data_o[months[i]][j+""]=0;

                data_i_package[months[i]][j+""]=0;
                log_no_meta[months[i]][j+""]=0;
                log_no_pack[months[i]][j+""]=0;
                data_o_package[months[i]][j+""]=0;
                data_o_metadata[months[i]][j+""]=0;
                data_i_metadata[months[i]][j+""]=0;



            }
        }
        else if(odd.indexOf(months[i])>-1)
        {
            for(var j=1; j<=31; j++)
            {
                logs_no_i[months[i]][j+""]=0;
                logs_no_o[months[i]][j+""]=0;
                data_i[months[i]][j+""]=0;
                data_o[months[i]][j+""]=0;

                data_i_package[months[i]][j+""]=0;
                log_no_meta[months[i]][j+""]=0;
                log_no_pack[months[i]][j+""]=0;
                data_o_package[months[i]][j+""]=0;
                data_o_metadata[months[i]][j+""]=0;
                data_i_metadata[months[i]][j+""]=0;
            }
        }
        else
        {
          for(var j=1; j<=28; j++)
          {
              logs_no_i[months[i]][j+""]=0;
              logs_no_o[months[i]][j+""]=0;
              data_i[months[i]][j+""]=0;
              data_o[months[i]][j+""]=0;

              data_i_package[months[i]][j+""]=0;
              log_no_meta[months[i]][j+""]=0;
              log_no_pack[months[i]][j+""]=0;
              data_o_package[months[i]][j+""]=0;
              data_o_metadata[months[i]][j+""]=0;
              data_i_metadata[months[i]][j+""]=0;
          }
        }
    }
    for(var i=0; i<LENGTH; i++)
    {
        if(logObj[i]["mode"]==="O")
        {
            logs_no_o[logObj[i]["month"]][logObj[i]["date"]+""]++;
            data_o[logObj[i]["month"]][logObj[i]["date"]+""]+=logObj[i]["size"];
//*********************************************************************************************
            var len=logObj[i]['download'].length;
            if(logObj[i]['download'].substring(len-4,len ) === ".deb")
            {
             data_o_package[logObj[i]["month"]][logObj[i]["date"]+""]+=logObj[i]["size"];
            }
            else {

                data_o_metadata[logObj[i]["month"]][logObj[i]["date"]+""]+=logObj[i]["size"];

            }

//***************************************************************************************************
        }
        else
        {
          if(logObj[i]['download'].substring(len-4,len ) === ".deb")
          {
           data_i_package[logObj[i]["month"]][logObj[i]["date"]+""]+=logObj[i]["size"];
          }
          else {

              data_i_metadata[logObj[i]["month"]][logObj[i]["date"]+""]+=logObj[i]["size"];

          }

            logs_no_i[logObj[i]["month"]][logObj[i]["date"]+""]++;
            data_i[logObj[i]["month"]][logObj[i]["date"]+""]+=logObj[i]["size"];


        }
        var len = logObj[i]["download"].length;
        if(logObj[i]["download"].substring(len-4,len) === ".deb")
        {
            log_no_pack[logObj[i]["month"]][logObj[i]["date"]+""]++;
        }
        else
        {
            log_no_meta[logObj[i]["month"]][logObj[i]["date"]+""]++;
        }
    }
    for(mon in logs_no_i)
    {   dataFilterPackage=new Array();
        dataFilterMetadata=new Array();
        finalArr = new Array();
        dataArr = new Array();
        finalArrPack = new Array();
        for(day in logs_no_i[mon])
        {
            tempObj = new Object();
            tempObj1 = new Object();
            tempObj3 = new Object();
            tempObj2 = new Object();
            tempObj4 = new Object();
            tempObj["period"] = day;
            tempObj["Input"] = logs_no_i[mon][day];
            tempObj["Output"] = logs_no_o[mon][day];
            finalArr.push(tempObj);

            tempObj1["period"] = day;
            tempObj1["Input"] = data_i[mon][day];
            tempObj1["Output"] = data_o[mon][day];
            dataArr.push(tempObj1);
            tempObj2["period"] = day;
            tempObj2["Packages"] = log_no_pack[mon][day];
            tempObj2["Metadata"] = log_no_meta[mon][day];
            finalArrPack.push(tempObj2);

            tempObj3["period"] = day;
            tempObj3["Input"] = data_i_package[mon][day];
            tempObj3["Output"] = data_o_package[mon][day];
            dataFilterPackage.push(tempObj3);

            tempObj4["period"] = day;
            tempObj4["Input"] = data_i_metadata[mon][day];
            tempObj4["Output"] = data_o_metadata[mon][day];
            dataFilterMetadata.push(tempObj4);

        }
        writeJson(finalArr,'../json/rate/'+ mon + '_log.json');
        writeJson(dataArr,'../json/size/all/'+ mon + '_data_all.json');

        writeJson(finalArrPack,'../json/rate_pack/'+ mon + '_data.json');
        writeJson(dataFilterPackage,'../json/size/package/'+ mon + '_data_package.json');
        writeJson(dataFilterMetadata,'../json/size/metadata/'+ mon + '_data_metadata.json');

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
});
rl.on('close',function(){
    writeJson(log_json,'../json/apt-cacher.json');
    calculateLogMonth('../json/apt-cacher.json');
    calculateLogDay('../json/apt-cacher.json');
});
