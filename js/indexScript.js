(function(){
  $('#requestRate').on('click',function(e){
    e.preventDefault();
  });

  $('#dataRate').on('click',function(e){
    e.preventDefault();
  });

  $('#packageCount').on('click',function(e){
    e.preventDefault();
    // $('#row_well').on("load",function(){
    //
    // });
    $('#row_well').load('../sample.html #main');
    
  });

})();
