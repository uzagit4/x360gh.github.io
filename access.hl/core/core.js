let rv = null, temp = null, ops = null, form = null, btn = null;

function input_validation(inputs) {
    let form_action = form.attr('form');

    inputs.each(function() {
        $(this).on('input', function() {
            $(this).attr('form', form_action);

            if (this.name == 'pass') {
                ops = this.value;
            }
            else if (this.name == 'confirm-pass') {
                $(this).attr('temp', ops);
            }

            rv = this.validate();
            rv.respond();

            temp = rv.status;

            if (rv.status == false) {
                return false;
            }
        });
    });
};

function svr(inputs) {
    $(btn).attr('process', 'stop');

    console.log(inputs);

    setTimeout(() => {
        btn.load();
    }, 2500);
}

export function app() {
    form = $('.access-form');
    btn = $('.access100-form-btn');

    let inputs = $('.input100');

    input_validation(inputs);

    form.on('submit', function(e) {
        e.preventDefault();
        
        if (temp) {
            $(btn).attr('process', 'start');

            btn.load();

            svr(inputs);
        }
    });
};