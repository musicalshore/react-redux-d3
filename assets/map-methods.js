$(document).ready(function() {

  var data ='';
  $(function(){

    $.getJSON('/assets/best-driver.json', function(data){

      data = data;

      // TABS
      var tabs = $( "#tabs .tab" );
      tabs.click(function(e) {
        var id = $(e.currentTarget).attr('id');
        tabs.removeClass('selected');
        $(e.currentTarget).addClass('selected');
      });
      // TABS

    });

  });
});
