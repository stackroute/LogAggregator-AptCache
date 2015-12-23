(function(){
    $('#contenttable').hide();

    $('#year_tab').click(function(){
      $('#contenttable').hide();
      $('#dropdownMenu1').html('Year');
    });

    $("#y2015").click(function(){
      $('#dropdownMenu1').html('2015');
      $('#contenttable td').remove();
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
      $('#dropdownMenu2').html('Year');
      $("#dropdownMenu3").html('Month');
      $('#dropdownMenu3').attr("disabled", true);

      $('#y15').click(function(){
        $('#dropdownMenu2').html($(this).text());
        $('#dropdownMenu3').attr("disabled", false);
      });

      $("#monthList li").click(function() {
        $('#contenttable tr').show();
        $('#contenttable td').remove();
        $('#dropdownMenu3').html($(this).text())
                var id =$ (this).children().attr('id');

            $.ajax({
              url:'json/package/'+id+'.json',
              dataType:'json',
              type:'get',
              cache:false,
              success:function(data){

                WriteTable(data);
              },
              error: function() {
                $('#contenttable tr').hide();

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

    });

})();
