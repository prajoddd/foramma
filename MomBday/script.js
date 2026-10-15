/* =========================================
   ELEMENTS
========================================= */

const opening =
    document.getElementById("opening");

const beginBtn =
    document.getElementById("beginBtn");

const envelope =
    document.getElementById("envelope");

const letterModal =
    document.getElementById("letterModal");

const letterClose =
    document.getElementById("letterClose");

const heartButtons =
    document.querySelectorAll(".message-heart");

const heartMessage =
    document.getElementById("heartMessage");

const heartMessageText =
    document.getElementById("heartMessageText");


/* =========================================
   LOCK PAGE BEFORE BEGIN
========================================= */

document.body.style.overflow = "hidden";


/* =========================================
   BEGIN
========================================= */

beginBtn.addEventListener("click", () => {

    document.body.style.overflow = "";

    opening.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

});


/* =========================================
   HEART MESSAGES
========================================= */

let activeHeart = null;

heartButtons.forEach((heart) => {

    heart.addEventListener("click", () => {

        /*
            If the user clicks the same heart
            again, don't make it fly away.
        */

        if (activeHeart === heart) {

            return;

        }


        /*
            Make the previous heart
            fly upward.
        */

        if (activeHeart) {

            const previousHeart =
                activeHeart;

            previousHeart.classList.remove(
                "active"
            );

            previousHeart.classList.add(
                "flying-away"
            );


            /*
                Reset the old heart after
                its animation finishes.
            */

            setTimeout(() => {

                previousHeart.classList.remove(
                    "flying-away"
                );

            }, 700);

        }


        /*
            Activate the newly clicked heart.
        */

        heart.classList.add("active");

        activeHeart = heart;


        /*
            Get its message.
        */

        const message =
            heart.dataset.message;


        /*
            Hide the previous message
            before showing the new one.
        */

        heartMessage.classList.remove(
            "show"
        );


        setTimeout(() => {

            heartMessageText.textContent =
                message;

            heartMessage.classList.add(
                "show"
            );

        }, 150);

    });

});


/* =========================================
   OPEN ENVELOPE
========================================= */

function openEnvelope() {

    if (
        envelope.classList.contains("open")
    ) {

        openLetter();

        return;

    }


    envelope.classList.add("open");


    /*
        Give the envelope flap time
        to open before showing the
        complete letter.
    */

    setTimeout(() => {

        openLetter();

    }, 900);

}


/* =========================================
   OPEN FULL LETTER
========================================= */

function openLetter() {

    letterModal.classList.add("open");

    letterModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";


    const paper =
        letterModal.querySelector(
            ".modal-paper"
        );


    if (paper) {

        paper.scrollTop = 0;

    }

}


/* =========================================
   CLOSE LETTER
========================================= */

function closeLetter() {

    letterModal.classList.remove(
        "open"
    );

    letterModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";


    /*
        Once the letter is closed,
        move to the final message.
    */

    setTimeout(() => {

        const finalSection =
            document.querySelector(
                ".final-section"
            );


        if (finalSection) {

            finalSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 250);

}


/* =========================================
   ENVELOPE CLICK
========================================= */

envelope.addEventListener(
    "click",
    openEnvelope
);


/* =========================================
   ENVELOPE KEYBOARD ACCESS
========================================= */

envelope.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openEnvelope();

        }

    }
);


/* =========================================
   CLOSE BUTTON
========================================= */

letterClose.addEventListener(
    "click",
    closeLetter
);


/* =========================================
   CLICK OUTSIDE LETTER
========================================= */

letterModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === letterModal
        ) {

            closeLetter();

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            letterModal.classList.contains("open")
        ) {

            closeLetter();

        }

    }
);