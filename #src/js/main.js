//dynamic adaptive

new DynamicAdapt("max").init();

//header menu on mobiles

const widthFromMobile = 480;

const menuBtnTopHeader = document.querySelector('.top-header .menu-icon');
const menuMobileHeader = document.querySelector('.mobile-header');
const closeBtnMobileHeader = document.querySelector('.mobile-header .menu-icon');

//setting of scheme

const changeThemeBtn = document.querySelector('.nav__btn-theme');
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');

const themes = {
    "light": "dark",
    "dark": "light"
}

if (changeThemeBtn && lightStyles?.length && darkStyles?.length && darkSchemeMedia) {
    setupSwitcher();
    setupScheme();
}


if (menuBtnTopHeader && menuMobileHeader && closeBtnMobileHeader) {
    menuBtnTopHeader.addEventListener('click', () => {
        menuBtnTopHeader.style.pointerEvents = "none";
        menuMobileHeader.style.left = 0;
        document.body.style.overflow = "hidden";
        closeBtnMobileHeader.style.pointerEvents = null;
    });
    closeBtnMobileHeader.addEventListener('click', () => {
        closeBtnMobileHeader.style.pointerEvents = "none";
        document.body.style.overflow = null;
        menuMobileHeader.style.left = null;
        menuBtnTopHeader.style.pointerEvents = null;
    });
}

window.addEventListener('resize', () => {
    const widthWindow = Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth, 0);
    if (menuBtnTopHeader && menuMobileHeader && closeBtnMobileHeader && widthWindow > widthFromMobile) {
        menuMobileHeader.style.left = null;
        closeBtnMobileHeader.style.pointerEvents = "none";
        menuBtnTopHeader.style.pointerEvents = null;
    }
});


function setupSwitcher() {
    const savedScheme = getSavedScheme();
    if (savedScheme) {
        changeThemeBtn.classList.add(themes[savedScheme]);
        changeThemeBtn.dataset.value = savedScheme;
    }
    if (changeThemeBtn)
        changeThemeBtn.addEventListener('click', (e) => {
            const theme = e.currentTarget.dataset.value;
            setScheme(themes[theme]);
            changeThemeBtn.classList.remove(themes[theme]);
            changeThemeBtn.classList.add(theme);
            changeThemeBtn.dataset.value = themes[theme];
    
        });
}

function setScheme(scheme) {
    switchMedia(scheme);
    saveScheme(scheme);
}

function getSystemScheme() {
    const darkScheme = darkSchemeMedia.matches;
    return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
    return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
    localStorage.setItem('color-scheme', scheme);
}

function switchMedia(scheme) {
    let lightMedia = (scheme === 'light') ? 'all' : 'not all';
    let darkMedia = (scheme === 'dark') ? 'all' : 'not all';

    
    [...lightStyles].forEach((link) => {
        link.media = lightMedia;
    });

    [...darkStyles].forEach((link) => {
        link.media = darkMedia;
    });
}

function setupScheme() {
    const savedScheme = getSavedScheme();
    const systemScheme = getSystemScheme();
    
    if (savedScheme == null) {
        changeThemeBtn.classList.add(themes[systemScheme]);
        changeThemeBtn.dataset.value = systemScheme;
        return;
    }

    if (savedScheme !== systemScheme) {
        setScheme(savedScheme);
    }
}

