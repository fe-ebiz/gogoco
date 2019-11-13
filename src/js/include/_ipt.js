$(function() {
    $('body').on('click', '.cell.ipt', function() {
        var _this = $(this),
            $no = $('.no');
            el = '<input type="text" class="form-input">',
            elVal = '';
        $no.hide();
        _this.html(el);
        _this.find('.form-input').focus();
        _this.find('.form-input').on('change', function() {
            elVal = _this.find('.form-input').val();
            _this.text(elVal);
            $no.show();
            $(this).remove();
        });
        _this.find('.form-input').on('blur', function() {
            $no.show();
            $(this).remove();
        });
        _this.find('.form-input').on('keydown', function(e) {
            var code = e.which? e.which : e.keyCode;
            if ( code == 13 ) {
                $(this).blur();
                console.log(elVal);
            }
        });
    });
});
