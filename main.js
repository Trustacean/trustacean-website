window.onload = function () {
    let card = document.querySelector('.card');
    let profile = document.querySelector('.profile-info__section');

    setTimeout(function () {

        var isAnimating = false;

        document.addEventListener('click', function () {
            if (isAnimating) {
                return;
            }

            isAnimating = true;

            var rings = document.querySelectorAll('[class^="ring"]');

            rings.forEach(function (ring, index) {
                ring.style.borderRadius = '49%';
                ring.style.opacity = '0.8';
                ring.style.filter = 'hue-rotate(-40deg)';
                ring.style.transform = 'rotate(20deg)'

                setTimeout(function () {
                    ring.style.borderRadius = '50%';
                    ring.style.opacity = '0.3';
                    ring.style.filter = 'hue-rotate(0deg)';

                    if (index === rings.length - 1) {
                        isAnimating = false;
                    }
                }, 1500);
            });
        });
    }, 6000);

    document.onmousemove = function (e) {

        let X = e.clientX - window.innerWidth / 2;
        let Y = e.clientY - window.innerHeight / 2;

        let parallaxX = -(X / 50);
        let parallaxY = -(Y / 50);
        let parallaxBoxShadow = `${parallaxX / 4}px ${parallaxY / 4}px 0px rgba(77, 166, 255, 0.7)`;

        if (card.matches(':hover')) {
            card.style.transform = `scale(1.1)`;
        } else {
            card.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
        }
        card.style.boxShadow = parallaxBoxShadow;
        // profile.style.transform = `translate(${parallaxX / 3}px, ${parallaxY / 3}px)`;
    };
};