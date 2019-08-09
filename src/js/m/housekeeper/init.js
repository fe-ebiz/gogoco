$(function() {

})

var housekeeperPopup = {
    display : function(flag, obj) {
        var $obj = $('[data-target=' + obj + ']');
        
        switch (flag) {
            case true :
                $obj.css({display: 'table'});
                $obj.find('.popup-body').scrollTop(0);
                wheelFn(false);
                break;
            case false :
                $obj.css({display: 'none'});
                wheelFn(true);
                break;
            default : 
                console.log('unhandled flag');
        }
    }
}
function wheelFn(flag) {
    if (flag == false) {
        $('html').css({
            overflow: 'hidden'
        });
    }
    if (flag == true) {
        $('html').css({
            overflow: 'auto'
        });
    }

}