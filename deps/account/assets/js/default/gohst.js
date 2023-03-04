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

let rv, temp, ops;

function load_page(ops) {
    
    let target = ops.target,
    nav_btn = ops.nav_btn,
    init = ops.init,
    page_title = ops.page_title,
    container = $('.app-page-content'),
    loader = $(container).children()[0],
    content = $(container).children()[1],
    page = 'https://x360gh.github.io/account.hl/pages/' + target + '.html',
    titles = {
        dash: 'Dashboard',
        wallet: 'Wallet',
        chat: 'Chat',
        profile: 'Profile',
        settings: 'Settings'
    };

    $(page_title).html(' ');

    if ($(loader).hasClass('hide-page')) {
        $(loader).removeClass('hide-page');
        $(content).addClass('hide-page');
    }

    setTimeout(() => {
        $(content).load(page, function() {
            switch (init) {
                case 'app-nav':
                        $(nav_btn)[0].click();
                    break;
            
                case 'user-nav':
                        $(nav_btn).click();
                    break;
            }
            setTimeout(() => {
                $(loader).addClass('hide-page');
                $(content).removeClass('hide-page');
    
                $('.app-page-header h1').html(titles[target]);
            }, 1000);
        });
    }, 500);
}