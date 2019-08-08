$(function() {

})

var housekeeperPopup = {
    display : function(flag, obj) {
        var $obj = $(obj);
        switch (flag) {
            case true :
                $obj.css({display: 'table'});
                break;
            case false :
                $obj.css({display: 'none'});
                break;
            default : 
                console.log('unhandled flag');
        }
    }
}