function show_modal() {

    let btnPressed = false;

    function openModal(triggerSelect, modalSelect, closeSelect, deleteTriger) {
        let trigger = document.querySelectorAll(triggerSelect),
            modal = document.querySelector(modalSelect),
            close = document.querySelector(closeSelect),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {

            item.addEventListener('click', (event) => {
                event.preventDefault();

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                btnPressed = true;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                console.log(event.target.className);

                if (event.target.classList.contains(deleteTriger)) {
                    document.querySelector('.' + deleteTriger).style.display = 'none'
                };
                
            });
        });

        close.addEventListener('click', (e) => {

            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.marginRight = `0px`;
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (event) => {
            if (event.target.className === modal.className) {

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    };

    function openModalByTime(select, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(select).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            };

        }, time);
    };

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    function openByScroll(selector) {

        window.addEventListener('scroll', () => {

            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            };

        });

    };

openModal('.button-design', '.popup-design', '.popup-design .popup-close');
openModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
openModalByTime('.popup-consultation', 60000);
openModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', 'fixed-gift');
openByScroll('.fixed-gift');



};

export default show_modal;

