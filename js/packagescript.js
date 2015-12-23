
$(document).ready(function(){
    $("#y2015").click(function(){
      $.ajax({
        url:'json/package/Year2015.json',
        dataType:'json',
        type:'get',
        cache:false,
        success:function(data){
          WriteTable(data);
        }
      })

      function WriteTable(data) {
        for (i = 0; i < data.length; i++) {
          WriteRow(data[i]);
        }
      }

      function WriteRow(rowData) {
        var row = $("<tr />")
        $("#contenttable").append(row);
        i= i===0?i=1:i;
        row.append($("<td>" + i + "</td>"));
        row.append($("<td>" + rowData["Package Name"] + "</td>"));
        row.append($("<td>" + rowData["Package Version"] + "</td>"));
        row.append($("<td>" + rowData["Package Architecture"] + "</td>"));
        row.append($("<td>" + rowData["Count"] + "</td>"));
      }

    });

});
