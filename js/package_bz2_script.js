function WriteTable(data) {
  var row = $("<tr />");
  $("#contenttable").append(row);
  row.append($("<th>Package Name</th>"));
  row.append($("<th>Operating System</th>"));
  row.append($("<th>Count</th>"));
  for(ele in data)
  {
      WriteRow(data,ele);
  }
}

function WriteRow(data,ele) {
  var row = $("<tr />");
  $("#contenttable").append(row);
  var th = $('<th />')
  th.append(ele);
  row.append(th);
  var i=0;
  var flag = false;
  for(e in data[ele])
  {
      if(flag === false)
      {
          row.append($("<td>"+e+"</td>"));
          row.append($("<td>"+data[ele][e]["count"]+"</td>"));
          flag = true;
      }
      else
      {
        var innerRow = $("<tr />");
        $("#contenttable").append(innerRow);
        innerRow.append($("<td>"+e+"</td>"));
        innerRow.append($("<td>"+data[ele][e]["count"]+"</td>"));
      }
      i++;

  }
  th.attr('rowspan',i);

}

$(document).ready(function(){
  $("#y2015").click(function(){
      $("#dropdownMenu1").html("2015");
      $.ajax({
        url:'json/package_bz2_info/packages_all.json',
        dataType:'json',
        type:'get',
        cache:false,
        success:function(data){
          WriteTable(data);
        }
      });
    });
  $('#y15').click(function(){
      $('#dropdownMenu2').html('2015');
      $("#monthList1 li").click(function() {
          var month = $(this).text();
          var id = $(this).children().attr('id');
          $("#contenttable").empty();
          $('#dropdownMenu3').html(month);
          $.ajax({
            url:'json/package_bz2_info/packages_monthly.json',
            dataType:'json',
            type:'get',
            cache:false,
            success:function(data){
              WriteTable(data[id]);
            }
          });

      });

    });
    $("#year_tab").click(function(){
        $("#contenttable").empty();
    });
    $("#month_tab").click(function(){
        $("#contenttable").empty();
    });

});
