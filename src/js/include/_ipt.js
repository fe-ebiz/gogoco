$(function() {
    $('body').on('click', '.cell.ipt', function() {
        var _this = $(this),
            el = '<input type="text" class="form-input">',
            elVal = '';
        _this.html(el);
        _this.find('.form-input').focus();
        _this.find('.form-input').on('blur', function() {
            elVal = _this.find('.form-input').val();
            _this.text(elVal);
            _this.find('.form-input').remove();
        });
        _this.find('.form-input').on('keydown', function(e) {
            var code = e.which? e.which : e.keyCode;
            if ( code == 13 ) {
                $(this).blur();
            }
        });
    });
});
