$(document).ready(function(){
    $("#y2015").click(function(){
      $.ajax({
        url:'json/apt-cacher.json',
        dataType:'json',
        type:'get',
        cache:false,
        success:function(data){
          var i=1;
          $(data).each(function(index,value){
//             var ext = value.download.split('.').pop().toLowerCase();
// if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
//     alert('invalid extension!');
// }
console.log(value.download.split("").reverse());
            //if(value.download.split('.').reverse()[0]==='.deb')
            // $('#contenttable').after('tr').append('<tr>'+'<td>'+i+++'</td>'+'<td>'+value.download+'</td>'+'</tr>');

          });
        }
      })
      $(document).ajaxStop(function(){
         alert("AJAX request successfully completed");
     });
    });

  });
