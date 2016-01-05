(function(){

  function WriteTable(data) {
    for (i = 0; i < data.length; i++) {
      WriteRow(data[i]);
    }
    $('#grid-basic').bootgrid();
  }

  function WriteRow(rowData) {
    var row = $("<tr />")
    $('#grid-basic').append(row);
    row.append($("<td>" + parseInt(i+1) + "</td>"));
    row.append($("<td>" + rowData["Package Name"] + "</td>"));
    row.append($("<td>" + rowData["Package Version"] + "</td>"));
    row.append($("<td>" + rowData["Package Architecture"] + "</td>"));
    row.append($("<td>" + rowData["Count"] + "</td>"));
  }

  function loadYearData(){
    $('#dropdownMenu1').html('2015');
    $('#grid-basic').bootgrid("destroy");
    $('#grid-basic tbody').empty();
    $.ajax({
      url:'/package/Year2015',
      dataType:'json',
      type:'get',
      cache:false,
      success:function(data){
          WriteTable(data);
      }
    });
  }

  loadYearData();

  $('#year_tab').click(function(){
    loadYearData();
  });

  $("#y2015").click(function(){
    loadYearData();
  });

  $('#month_tab').click(function(){
    $('#dropdownMenu2').html('2015');
    $("#dropdownMenu3").html('Oct');
    $('#grid-basic').bootgrid("destroy");
    $('#grid-basic tbody').empty();
    $.ajax({
      url:'/package/Oct',
      dataType:'json',
      type:'get',
      cache:false,
      success:function(data){
        WriteTable(data);
      }
    });

    $('#y15').click(function(){
      $('#dropdownMenu2').html($(this).text());
    });

    $("#monthList li").click(function() {

      $('#grid-basic').bootgrid("destroy");
      $('#grid-basic tbody').empty();
      $('#dropdownMenu3').html($(this).text());
      var id =$ (this).children().attr('id');

      $.ajax({
        url:'/package/'+id,
        dataType:'json',
        type:'get',
        cache:false,
        success:function(data){
          WriteTable(data);
        },
        error: function() {
          $('#grid-basic tbody').empty();
          var row = $("<tr />");
          $('#grid-basic').append(row);
          for(k=0;k<5;k++)
          {
            var errorTableData=$("<td>No Data</td>");
            row.append(errorTableData);
          }
        }
      });
    });
  });
})();
