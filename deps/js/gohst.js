// function to copy text in a html document
// function fnSelect(x, y) {
//     fnDeselect();
//     if (document.selection) {
//         let range = document.body.createTextRange();
//         range.moveToElementText(document.querySelector(x));
//         range.select();

//     } else if (window.getSelection) {
//         let range = document.createRange();
//         range.selectNode(document.querySelector(x));
//         window.getSelection().addRange(range);
//     }
//     if (document.execCommand('copy')) {
//         window.getSelection().removeAllRanges();
//         res_cont = document.querySelector(y);
//         res_cont.removeClass('text-muted');
//         res_cont.addClass('text-info');
//         res_cont.innerHTML = 'Link copied';
//         setTimeout(() => {
//             res_cont.removeClass('text-info');
//             res_cont.addClass('text-muted');
//             res_cont.innerHTML = 'Referral Link';
//         }, 3000);
//     }
// }

// function fnDeselect() {
//     if (document.selection) document.selection.empty();
//     else if (window.getSelection)
//         window.getSelection().removeAllRanges();
// }

// Object.prototype.ve = new Promise((resolve, reject) => {
//     let x = 1;

//     if (x == 0)
//         resolve(JSON.stringify("ok"));
//     else
//         resolve(JSON.stringify("error"));
// });

let rv, temp = null;

rv = {status: null, target: null, msg: null}

Object.prototype.validate = function() {
    let pn = null, status = null, target = null, msg = null;

    let name = this.name;
    let val = this.value;
    let form = $(this).attr('form');
    temp = $(this).attr('temp');

    if (form == 'register') {
        switch (name) {
            case 'name':
                    if (val.length > 2) {
                        pn = /[a-z]/;
                        if (pn.test(val)) {
                            status = true;
                            target = name;
                        }
                        else {
                            status = false;
                            target = name;
                            msg = 'a-z or A-Z required'
                        }
                    }
                    else {
                        status = false;
                        target = name;
                        msg = 'too short';
                    }
                break;
            case 'email':
                    if (val.length > 5) {
                        pn = /[@]/;
                        if (pn.test(val)) {
                            pn = /[.]/g;
                            if (pn.test(val)) {
                                status = true;
                                target = name;
                            }
                            else {
                                status = false;
                                target = name;
                                msg = 'invalid'
                            }
                        }
                        else {
                            status = false;
                            target = name;
                            msg = 'invalid'
                        }
                    }
                    else {
                        status = false;
                        target = name;
                        msg = 'too short';
                    }
                break;
            case 'phone':
                    if (val.length > 9) {
                        pn = /[+]/;
                        if (pn.test(val)) {
                            pn = /[0-9]/g;
                            if (pn.test(val)) {
                                status = true;
                                target = name;
                            }
                            else {
                                status = false;
                                target = name;
                                msg = 'invalid'
                            }
                        }
                        else {
                            status = false;
                            target = name;
                            msg = 'invalid'
                        }
                    }
                    else {
                        status = false;
                        target = name;
                        msg = 'too short';
                    }
                break;
            case 'pass':
                    if (val.length > 4) {
                        pn = /[a-zA-Z0-9]/;
                        if (pn.test(val)) {
                            
                            status = true;
                            target = name;
                        }
                        else {
                            status = false;
                            target = name;
                            msg = 'weak'
                        }
                    }
                    else {
                        status = false;
                        target = name;
                        msg = 'too short';
                    }
                break;
            case 'confirm-pass':
                    if (val.length > 4) {
                        pn = temp;
                        if (pn == val) {
                            
                            status = true;
                            target = name;
                        }
                        else {
                            status = false;
                            target = name;
                            msg = 'passwords do not match'
                        }
                    }
                    else {
                        status = false;
                        target = name;
                        msg = 'too short';
                    }
                break;
        }
    }
    else {
        if (val.length < 2) {
            status = false;
            target = name;
            msg = 'too short';
        }
        else {
            status = true;
            target = name;
        }
    }



    rv.status = status;
    rv.target = target;
    rv.msg = msg;

    return rv;
}

Object.prototype.respond = function() {
    let status = this.status,
    target = this.target,
    response = this.msg,
    target_area = '.' + target + '-area',
    wrapper = target_area +  ' .wrap-input100';

    if (status == false) {

        let flash_container = document.createElement('div');
        let icon_container = document.createElement('span');
        let icon = document.createElement('i');
        let response_container = document.createElement('span');

        flash_container.classList.add('flash-response','bg-danger','rounded','text-light', 'text-center');
        flash_container.style.opacity = 0;
        flash_container.style.transition = 'opacity 100ms cubic-bezier(0.4, 0, 1, 1) 0s';
        icon_container.classList.add('m-l-10');
        icon.classList.add('fa', 'fa-exclamation-circle');
        icon.ariaHidden = true;
        response_container.classList.add('response', 'm-l-10');
        response_container.innerHTML = response;

        icon_container.append(icon);
        flash_container.append(icon_container);
        flash_container.append(response_container);

        $(wrapper).css('margin-bottom', '10px');
        $(flash_container).css('margin-bottom', '37px');

        if ($('.flash-response').length != 0) {
            $('.flash-response').remove();
        }

        $(target_area).append(flash_container);

        setTimeout(() => {
            flash_container.style.opacity = 1;
        }, 100);
    }
    else {
        setTimeout(() => {
            $('.flash-response').remove();
            $(wrapper).css('margin-bottom', '37px');
        }, 250);
    }
}

Object.prototype.load = function() {
    let process = $(this).attr('process'),
    text = $(this).children()[0];
    icon = $(this).children()[1];

    switch (process) {
        case 'start':
                $(icon).attr('hidden', false);
                $(text).attr('hidden', true);
            break;
        case 'stop':
                $(icon).attr('hidden', true);
                $(text).attr('hidden', false);
            break;
    }
}

async function flash(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        body: JSON.stringify(data)
    });

    return response.json();
}