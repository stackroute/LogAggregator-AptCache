
$(document).ready(function(){
    $("#y2015").click(function(){
      $.ajax({
        url:'json/package_repo/output_repo.json',
        dataType:'json',
        type:'get',
        cache:false,
        success:function(data){
          WriteTable(data);
        }
      })

      function WriteTable(data) {
        for (i in data) {

          for(j in data[i]){
            var row = $("<tr />")
            $("#contenttable").append(row);
            row.append($("<td width=\"200px\">" + j + "</td>"));
            for(k in data[i][j])
            {
              row.append($("<td width=\"200px\">" + k + "</td>"));
              for(l in data[i][j][k])
              {
                //  i= i===0?i=1:i;
                row.append($("<td width=\"400px\">" + data[i][j][k][l]["Name"] + "</td>"));
                row.append($("<td width=\"500px\">" +data[i][j][k][l]["Version"] + "</td>"));

              }
            }
          }

        }
      }

      function WriteRow(rowData,row1) {
        }

    });

});
