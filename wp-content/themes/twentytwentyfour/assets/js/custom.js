jQuery( document ).ready(function($) {

    var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";

    $.ajax({
        type: "POST",
        url: '/react-wp/wp-admin/admin-ajax.php',
        data: {
            action: 'get_token'
        },
         success:function(token){
            
            console.log(token);
         },
         error: function(errorThrown){
             console.log(errorThrown);
         }
     });




});