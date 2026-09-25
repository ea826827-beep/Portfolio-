document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       MOBILE MENU
    ============================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener(
            "click",
            function () {
                navLinks.classList.toggle("active");
            }
        );

        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {
                        navLinks.classList.remove(
                            "active"
                        );
                    }
                );

            });
    }


    /* ==============================
       TYPING EFFECT
    ============================== */

    const typing =
        document.getElementById("typing");

    if (typing) {

        const words = [
            "Web Penetration Tester",
            "Cybersecurity Student",
            "Ethical Hacker",
            "Security Researcher"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;


        function type() {

            const word =
                words[wordIndex];


            if (!deleting) {

                typing.textContent =
                    word.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex >= word.length
                ) {

                    deleting = true;

                    setTimeout(
                        type,
                        1500
                    );

                    return;
                }


            } else {

                typing.textContent =
                    word.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;


                if (charIndex <= 0) {

                    deleting = false;

                    wordIndex++;

                    if (
                        wordIndex >=
                        words.length
                    ) {
                        wordIndex = 0;
                    }
                }
            }


            setTimeout(
                type,
                deleting ? 50 : 100
            );
        }


        type();
    }


    /* ==============================
       DARK / LIGHT MODE
    ============================== */

    const themeBtn =
        document.getElementById("themeBtn");


    if (themeBtn) {

        const savedTheme =
            localStorage.getItem("theme");


        if (savedTheme === "light") {

            document.body.classList.add(
                "light"
            );

            const icon =
                themeBtn.querySelector("i");

            if (icon) {
                icon.className =
                    "fas fa-moon";
            }

        } else {

            document.body.classList.remove(
                "light"
            );

            const icon =
                themeBtn.querySelector("i");

            if (icon) {
                icon.className =
                    "fas fa-sun";
            }
        }


        themeBtn.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light"
                );


                const icon =
                    themeBtn.querySelector("i");


                if (
                    document.body.classList.contains(
                        "light"
                    )
                ) {

                    if (icon) {
                        icon.className =
                            "fas fa-moon";
                    }

                    localStorage.setItem(
                        "theme",
                        "light"
                    );

                } else {

                    if (icon) {
                        icon.className =
                            "fas fa-sun";
                    }

                    localStorage.setItem(
                        "theme",
                        "dark"
                    );
                }

            }
        );
    }


    /* ==============================
       CONTACT FORM
    ============================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const result =
        document.getElementById(
            "result"
        );


    /*
       IMPORTANT:
       Replace this with your
       real Render backend URL.

       Example:
       https://ersad-portfolio-backend.onrender.com
    */

    const BACKEND_URL =
        "https://ersad-portfolio-backend-6.onrender.com";


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim();


                const subject =
                    document
                        .getElementById("subject")
                        ?.value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();


                /* ==========================
                   VALIDATION
                ========================== */

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showResult(
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;
                }


                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailRegex.test(email)
                ) {

                    showResult(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                /* ==========================
                   BUTTON
                ========================== */

                const button =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (button) {

                    button.disabled = true;

                    button.textContent =
                        "Sending...";
                }


                showResult(
                    "Sending message...",
                    "loading"
                );


                /* ==========================
                   DATA
                ========================== */

                const formData = {

                    name: name,

                    email: email,

                    subject: subject,

                    message: message
                };


                try {

                    /* ==========================
                       SEND TO RENDER BACKEND
                    ========================== */

                    const response =
                        await fetch(
                            BACKEND_URL +
                            "/contact",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        formData
                                    )
                            }
                        );


                    const data =
                        await response.json();


                    /* ==========================
                       SUCCESS
                    ========================== */

                    if (
                        response.ok &&
                        data.success
                    ) {

                        showResult(
                            "✅ " +
                            (
                                data.message ||
                                "Message sent successfully!"
                            ),
                            "success"
                        );


                        contactForm.reset();


                    } else {

                        showResult(
                            "❌ " +
                            (
                                data.message ||
                                "Message could not be sent."
                            ),
                            "error"
                        );
                    }


                } catch (error) {

                    console.error(
                        "Contact error:",
                        error
                    );


                    showResult(
                        "❌ Backend connection failed.",
                        "error"
                    );


                } finally {

                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Send Message →";
                    }
                }

            }
        );
    }


    /* ==============================
       RESULT MESSAGE
    ============================== */

    function showResult(
        text,
        type
    ) {

        if (!result) return;

        result.textContent = text;

        result.className = type;
    }


    /* ==============================
       SMOOTH SCROLL
    ============================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }

                }
            );

        });


    /* ==============================
       CURRENT YEAR
    ============================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();
    }

});