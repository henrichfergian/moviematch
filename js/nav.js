document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
    loadNav();
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadNav() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;
                document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                    elm.innerHTML = xhr.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a, .brand-logo, .search").forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href");
                        if(page === null) {
                            page = event.target.parentNode.getAttribute("href");
                        }
                        page=page.substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhr.open("GET", "nav.html", true);
        xhr.send();
    }

    function loadPage() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                const content = document.querySelector("#body-content");
                $(document).ready(function(){
                    $('.parallax').parallax({});
                    $('.slider').slider({
                        indicators: false,
                        height: 450,
                        transition: 600,
                        interval: 3000
                    });
                    $('select').formSelect();
                    $('input.autocomplete').autocomplete({
                        data: {
                        "Jakarta": null,
                        "Yogyakarta": null,
                        "Bandung": null
                        },
                    });
                });
                if (this.status == 200) {
                    content.innerHTML = xhr.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhr.open("GET", "pages/" + page + ".html", true);
        xhr.send();
    }
});