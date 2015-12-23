(function(){
    $('#contenttable').hide();
    $("#y2015").click(function(){
      $('#dropdownMenu1').html('2015');
      $.ajax({
        url:'json/package/Year2015.json',
        dataType:'json',
        type:'get',
        cache:false,
        success:function(data){

          WriteTable(data);
        }
      });

      function WriteTable(data) {
        for (i = 0; i < data.length; i++) {
          WriteRow(data[i]);
        }
      }

      function WriteRow(rowData) {
        var row = $("<tr />")
        $("#contenttable").show();
        $("#contenttable").append(row);

        row.append($("<td>" + parseInt(i+1) + "</td>"));
        row.append($("<td>" + rowData["Package Name"] + "</td>"));
        row.append($("<td>" + rowData["Package Version"] + "</td>"));
        row.append($("<td>" + rowData["Package Architecture"] + "</td>"));
        row.append($("<td>" + rowData["Count"] + "</td>"));
      }

    });


    $('#month_tab').click(function(){
      $('#contenttable').hide();
      $('#dropdownMenu3').attr("disabled", true);

      $('#y15').click(function(){
        $('#dropdownMenu2').html($(this).text());
        $('#dropdownMenu3').attr("disabled", false);
      });

      $("#monthList li").click(function() {
        $('#contenttable td').remove();
        $('#dropdownMenu3').html($(this).text())
                var id =$ (this).children().attr('id');
                console.log(id);


            $.ajax({
              url:'json/package/'+id+'.json',
              dataType:'json',
              type:'get',
              cache:false,
              success:function(data){

                WriteTable(data);
              },
              error: function() {
                
                // alert("Error: " + errorThrown);
                // alert("XML error" + XMLHttpRequest );
              }
            });

            function WriteTable(data) {
              for (i = 0; i < data.length; i++) {
                WriteRow(data[i]);
              }
            }

            function WriteRow(rowData) {
              var row = $("<tr />")
              $("#contenttable").show();
              $("#contenttable").append(row);
              i= i===0?1:i;
              row.append($("<td>" + i + "</td>"));
              row.append($("<td>" + rowData["Package Name"] + "</td>"));
              row.append($("<td>" + rowData["Package Version"] + "</td>"));
              row.append($("<td>" + rowData["Package Architecture"] + "</td>"));
              row.append($("<td>" + rowData["Count"] + "</td>"));
            }

      });

    });



})();
