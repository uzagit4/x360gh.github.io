let app_links, rv, temp, ops;

function app_nav() {
    let nav_btn, init;

    app_links.each(function() {
        $(this).on('click', function() {
            temp = $(this).attr('page');

            if (temp == 'settings' || temp =='profile') {
                nav_btn = '.user-nav';
                init = 'user-nav'
            }
            else {
                nav_btn = '.dt-brand__tool';
                init = 'app-nav'
            }

            ops = {
                target: temp,
                nav_btn: nav_btn,
                init: init,
                page_title: '.app-page-header h1'
            }
        
            load_page(ops);
        });
    });
}

export function app() {
    ops = {
        target: 'dash',
        nav_btn: '.dt-brand__tool',
        init: 'app-start',
        page_title: '.app-page-header h1'
    }

    load_page(ops);

    app_links = $('.app-links');

    app_nav();
}