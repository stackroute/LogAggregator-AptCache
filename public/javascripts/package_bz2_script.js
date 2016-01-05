function WriteTable(data) {
  head = $("<thead />")
  $("#contenttable").append(head);
  var row = $("<tr />");
  head.append(row);
  row.append("<th data-column-id='PackName'>Package Name</th>");
  row.append("<th data-column-id='OSName'>Operating System</th>")
  row.append("<th data-column-id='Count' data-order='desc' data-type='numeric'>Count</th>")
  body = $("<tbody />")
  $("#contenttable").append(body);
  for(ele in data)
  {
      WriteRow(data,ele);
  }
  $("#contenttable").bootgrid();
}

function WriteRow(data,ele) {
  for(e in data[ele])
  {
      var row = $("<tr />");
      $(body).append(row);
      row.append($("<td>"+ele+"</td>"));
      row.append($("<td>"+e+"</td>"));
      row.append($("<td>"+data[ele][e]["count"]+"</td>"));

  }
  //th.attr('rowspan',i);
}

$(document).ready(function(){
  $("#dropdownMenu1").html("2015");
  $.ajax({
    url:'/package_bz2_info/packages_all',
    dataType:'json',
    type:'get',
    cache:false,
    success:function(data){
      WriteTable(data);

    }
  });
  $("#y2015").click(function(){

    $("#contenttable").bootgrid("destroy");
    $("#contenttable").empty();
      $("#dropdownMenu1").html("2015");
      $.ajax({
        url:'/package_bz2_info/packages_all',
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
        $("#contenttable").bootgrid("destroy");
        $("#contenttable").empty();
          var month = $(this).text();
          var id = $(this).children().attr('id');
          $('#dropdownMenu3').html(month);
          $.ajax({
            url:'/package_bz2_info/packages_monthly',
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
      $("#contenttable").bootgrid("destroy");
      $("#contenttable").empty();
    });
    $("#month_tab").click(function(){
      $("#contenttable").bootgrid("destroy");
      $("#contenttable").empty();
    });

});
//$("#contenttable").bootgrid();
