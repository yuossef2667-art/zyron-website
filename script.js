/* =========================
   ZYRON — WORK SYSTEM
   FILTER
   3D ALL
   DYNAMIC BACKGROUND
   FULLSCREEN VIDEO
   MOBILE SWIPE
   CATEGORY TRANSITION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const categoryButtons =
        document.querySelectorAll(".category");

    const projects =
        Array.from(
            document.querySelectorAll(".project")
        );

    const projectsContainer =
        document.querySelector(".projects");

    const workSection =
        document.querySelector(".work");


    let allIndex = 0;

    let touchStartX = 0;

    let touchEndX = 0;

    let wheelLock = false;

    let categoryLock = false;


    /* ==================================================
       HELPERS
    ================================================== */

    function visibleProjects() {

        return projects.filter(project => {

            return !project.classList.contains(
                "hidden"
            );

        });

    }


    function isMobile() {

        return window.innerWidth <= 700;

    }


    function stopAllVideos(
        exceptVideo = null
    ) {

        projects.forEach(project => {

            const video =
                project.querySelector(
                    ".project-video"
                );

            if (
                video &&
                video !== exceptVideo
            ) {

                video.pause();

                video.currentTime = 0;

            }

            project.classList.remove(
                "playing"
            );

        });

    }


    /* ==================================================
       TRANSITION LIGHT
    ================================================== */

    const transitionLight =
        document.createElement("div");

    transitionLight.className =
        "category-transition-light";

    document.body.appendChild(
        transitionLight
    );


    /* ==================================================
       UPDATE ALL BACKGROUND
    ================================================== */

    function updateAllBackground(items) {

        if (
            !projectsContainer ||
            !items.length
        ) {
            return;
        }


        const activeProject =
            items[allIndex];

        if (!activeProject) {
            return;
        }


        const activeCover =
            activeProject.querySelector(
                ".project-cover"
            );

        if (!activeCover) {
            return;
        }


        const imageSource =
            activeCover.currentSrc ||
            activeCover.src;


        if (!imageSource) {
            return;
        }


        projectsContainer.style.setProperty(
            "--active-project-bg",
            `url("${imageSource}")`
        );

    }


    /* ==================================================
       UPDATE ALL CAROUSEL
    ================================================== */

    function updateAllCarousel() {

        if (!projectsContainer) {
            return;
        }


        if (
            !projectsContainer.classList.contains(
                "all-view"
            )
        ) {
            return;
        }


        const items =
            visibleProjects();


        if (!items.length) {
            return;
        }


        updateAllBackground(items);


        const total =
            items.length;


        const viewportWidth =
            projectsContainer.clientWidth;


        const mobile =
            isMobile();


        const sideOffset =
            mobile
                ? 120
                : viewportWidth * 0.20;


        const farOffset =
            mobile
                ? 220
                : viewportWidth * 0.38;


        const hiddenOffset =
            mobile
                ? 310
                : viewportWidth * 0.55;


        items.forEach(
            (project, index) => {

                const relative =
                    (
                        (index - allIndex + total)
                        % total
                    );


                let offset =
                    relative;


                if (
                    relative >
                    total / 2
                ) {

                    offset =
                        relative - total;

                }


                let translateX = 0;

                let translateZ = 0;

                let rotateY = 0;

                let scale = 1;

                let opacity = 1;

                let blur = 0;

                let zIndex = 1;


                /* CENTER */

                if (
                    offset === 0
                ) {

                    translateX = 0;

                    translateZ = 0;

                    rotateY = 0;

                    scale =
                        mobile
                            ? 1.05
                            : 1;

                    opacity = 1;

                    blur = 0;

                    zIndex = 100;

                    project.classList.add(
                        "carousel-active"
                    );

                }


                /* RIGHT */

                else if (
                    offset === 1
                ) {

                    translateX =
                        sideOffset;

                    translateZ =
                        mobile
                            ? -120
                            : -160;

                    rotateY =
                        mobile
                            ? -8
                            : -10;

                    scale = 0.82;

                    opacity =
                        mobile
                            ? 0.72
                            : 0.90;

                    blur =
                        mobile
                            ? 0.8
                            : 0.5;

                    zIndex = 90;

                    project.classList.remove(
                        "carousel-active"
                    );

                }


                /* LEFT */

                else if (
                    offset === -1
                ) {

                    translateX =
                        -sideOffset;

                    translateZ =
                        mobile
                            ? -120
                            : -160;

                    rotateY =
                        mobile
                            ? 8
                            : 10;

                    scale = 0.82;

                    opacity =
                        mobile
                            ? 0.72
                            : 0.90;

                    blur =
                        mobile
                            ? 0.8
                            : 0.5;

                    zIndex = 90;

                    project.classList.remove(
                        "carousel-active"
                    );

                }


                /* FAR RIGHT */

                else if (
                    offset === 2
                ) {

                    translateX =
                        farOffset;

                    translateZ =
                        mobile
                            ? -260
                            : -360;

                    rotateY =
                        mobile
                            ? -14
                            : -18;

                    scale = 0.68;

                    opacity =
                        mobile
                            ? 0.38
                            : 0.48;

                    blur =
                        mobile
                            ? 1.8
                            : 1.5;

                    zIndex = 70;

                    project.classList.remove(
                        "carousel-active"
                    );

                }


                /* FAR LEFT */

                else if (
                    offset === -2
                ) {

                    translateX =
                        -farOffset;

                    translateZ =
                        mobile
                            ? -260
                            : -360;

                    rotateY =
                        mobile
                            ? 14
                            : 18;

                    scale = 0.68;

                    opacity =
                        mobile
                            ? 0.38
                            : 0.48;

                    blur =
                        mobile
                            ? 1.8
                            : 1.5;

                    zIndex = 70;

                    project.classList.remove(
                        "carousel-active"
                    );

                }


                /* FAR / HIDDEN */

                else {

                    translateX =
                        offset > 0
                            ? hiddenOffset
                            : -hiddenOffset;

                    translateZ =
                        mobile
                            ? -450
                            : -600;

                    rotateY =
                        offset > 0
                            ? -22
                            : 22;

                    scale = 0.55;

                    opacity = 0;

                    blur = 3;

                    zIndex = 20;

                    project.classList.remove(
                        "carousel-active"
                    );

                }


                project.style.transform = `
                    translate(-50%, -50%)
                    translateX(${translateX}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;


                project.style.opacity =
                    opacity;


                project.style.filter =
                    `blur(${blur}px)`;


                project.style.zIndex =
                    zIndex;

            }
        );

    }


    /* ==================================================
       ACTIVATE ALL
    ================================================== */

    function activateAllView() {

        if (!projectsContainer) {
            return;
        }


        allIndex = 0;


        projectsContainer.classList.add(
            "all-view"
        );


        projects.forEach(project => {

            project.classList.remove(
                "hidden"
            );

        });


        updateAllCarousel();

    }


    /* ==================================================
       ACTIVATE CATEGORY
    ================================================== */

    function activateCategory(
        filter
    ) {

        if (!projectsContainer) {
            return;
        }


        projectsContainer.classList.remove(
            "all-view"
        );


        projects.forEach(project => {

            const category =
                project.dataset.category;


            if (
                category === filter
            ) {

                project.classList.remove(
                    "hidden"
                );

            } else {

                project.classList.add(
                    "hidden"
                );

            }


            /* RESET CAROUSEL */

            project.style.transform =
                "";

            project.style.opacity =
                "";

            project.style.filter =
                "";

            project.style.zIndex =
                "";

            project.classList.remove(
                "carousel-active"
            );

        });

    }


    /* ==================================================
       CATEGORY CHANGE
    ================================================== */

    async function changeCategory(
        filter,
        button
    ) {

        if (
            categoryLock ||
            !projectsContainer
        ) {
            return;
        }


        categoryLock = true;


        /* =========================
           BUTTON
        ========================= */

        categoryButtons.forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });

        button.classList.add(
            "active"
        );


        /* =========================
           STOP VIDEOS
        ========================= */

        stopAllVideos();


        /* =========================
           EXIT ANIMATION
        ========================= */

        projectsContainer.classList.remove(
            "category-entering"
        );

        projectsContainer.classList.add(
            "category-leaving"
        );


        transitionLight.classList.add(
            "active"
        );


        await new Promise(resolve => {

            setTimeout(
                resolve,
                330
            );

        });


        /* =========================
           CHANGE CONTENT
        ========================= */

        if (
            filter === "all"
        ) {

            activateAllView();

        } else {

            activateCategory(
                filter
            );

        }


        /* =========================
           FORCE REFLOW
        ========================= */

        void projectsContainer.offsetWidth;


        projectsContainer.classList.remove(
            "category-leaving"
        );


        projectsContainer.classList.add(
            "category-entering"
        );


        /* =========================
           FADE RED LIGHT
        ========================= */

        setTimeout(() => {

            transitionLight.classList.remove(
                "active"
            );

        }, 180);


        /* =========================
           CLEANUP
        ========================= */

        setTimeout(() => {

            projectsContainer.classList.remove(
                "category-entering"
            );

        }, 800);


        await new Promise(resolve => {

            setTimeout(
                resolve,
                460
            );

        });


        categoryLock = false;

    }


    /* ==================================================
       CATEGORY BUTTONS
    ================================================== */

    categoryButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter;


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {
                        return;
                    }


                    changeCategory(
                        filter,
                        button
                    );

                }
            );

        }
    );


    /* ==================================================
       NEXT
    ================================================== */

    function goNext() {

        const items =
            visibleProjects();


        if (!items.length) {
            return;
        }


        allIndex =
            (
                allIndex + 1
            ) % items.length;


        updateAllCarousel();

    }


    /* ==================================================
       PREVIOUS
    ================================================== */

    function goPrevious() {

        const items =
            visibleProjects();


        if (!items.length) {
            return;
        }


        allIndex =
            (
                allIndex - 1 +
                items.length
            ) % items.length;


        updateAllCarousel();

    }


     /* ==================================================
       VIDEO MODAL
    ================================================== */

    const videoModal =
        document.createElement("div");


    videoModal.className =
        "video-modal";


    videoModal.innerHTML = `
        <button
            class="video-modal-close"
            aria-label="Close video"
        >
            ×
        </button>

        <div class="video-modal-content">

            <video
                class="fullscreen-video"
                playsinline
                controls
                preload="auto"
            ></video>

        </div>
    `;


    document.body.appendChild(
        videoModal
    );


    const fullscreenVideo =
        videoModal.querySelector(
            ".fullscreen-video"
        );


    const closeVideoButton =
        videoModal.querySelector(
            ".video-modal-close"
        );


    const modalContent =
        videoModal.querySelector(
            ".video-modal-content"
        );


    /* ==================================================
       OPEN VIDEO
    ================================================== */

    function openFullscreenVideo(
        project,
        video
    ) {

        if (!video) {
            return;
        }


        stopAllVideos();


        const card =
            project.querySelector(
                ".project-image"
            );


        if (!card) {
            return;
        }


        const rect =
            card.getBoundingClientRect();


        const centerX =
            window.innerWidth / 2;


        const centerY =
            window.innerHeight / 2;


        const cardCenterX =
            rect.left +
            rect.width / 2;


        const cardCenterY =
            rect.top +
            rect.height / 2;


        const startX =
            cardCenterX -
            centerX;


        const startY =
            cardCenterY -
            centerY;


        const startScale =
            Math.min(
                rect.width /
                    window.innerWidth,

                rect.height /
                    window.innerHeight
            );


        modalContent.style.setProperty(
            "--video-start-x",
            `${startX}px`
        );


        modalContent.style.setProperty(
            "--video-start-y",
            `${startY}px`
        );


        modalContent.style.setProperty(
            "--video-start-scale",
            Math.max(
                startScale,
                0.25
            )
        );


        /* ==================================================
           BUNNY HLS
        ================================================== */

        const bunnyHls =
            project.dataset.bunnyHls;


        if (
            bunnyHls &&
            window.Hls &&
            Hls.isSupported()
        ) {

            fullscreenVideo.pause();


            fullscreenVideo.removeAttribute(
                "src"
            );


            fullscreenVideo.load();


            const hls =
                new Hls();


            fullscreenVideo._hls =
                hls;


            hls.loadSource(
                bunnyHls
            );


            hls.attachMedia(
                fullscreenVideo
            );


            hls.on(
                Hls.Events.MANIFEST_PARSED,
                () => {

                    fullscreenVideo.currentTime =
                        0;

                    fullscreenVideo
                        .play()
                        .catch(() => {});

                }
            );

        }

        else {

            /* ==================================================
               LOCAL VIDEO
            ================================================== */

            const source =
                video.currentSrc ||
                video.querySelector(
                    "source"
                )?.src ||
                video.src;


            if (!source) {
                return;
            }


            fullscreenVideo.src =
                source;


            fullscreenVideo.load();


            fullscreenVideo.currentTime =
                0;


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    fullscreenVideo
                        .play()
                        .catch(() => {});

                });

            });

        }


        videoModal.classList.add(
            "active"
        );


        document.body.classList.add(
            "video-open"
        );

    }


    /* ==================================================
       CLOSE VIDEO
    ================================================== */

    function closeFullscreenVideo() {

        if (
            !videoModal.classList.contains(
                "active"
            )
        ) {
            return;
        }


        fullscreenVideo.pause();


        /* Destroy Bunny HLS */

        if (
            fullscreenVideo._hls
        ) {

            fullscreenVideo._hls.destroy();

            fullscreenVideo._hls =
                null;

        }


        videoModal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "video-open"
        );


        setTimeout(() => {

            fullscreenVideo.pause();


            fullscreenVideo.removeAttribute(
                "src"
            );


            fullscreenVideo.load();

        }, 700);

    }


    /* ==================================================
       CLOSE EVENTS
    ================================================== */

    closeVideoButton.addEventListener(
        "click",
        closeFullscreenVideo
    );


    videoModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                videoModal
            ) {

                closeFullscreenVideo();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeFullscreenVideo();

            }

        }
    );


    /* ==================================================
       CLICK PROJECT
    ================================================== */

    projects.forEach(
        project => {

            const image =
                project.querySelector(
                    ".project-image"
                );


            const video =
                project.querySelector(
                    ".project-video"
                );


            if (
                !image ||
                !video
            ) {
                return;
            }


            image.addEventListener(
                "click",
                () => {

                    openFullscreenVideo(
                        project,
                        video
                    );

                }
            );

        }
    );


    /* ==================================================
       KEYBOARD CAROUSEL
    ================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !projectsContainer ||
                !projectsContainer.classList.contains(
                    "all-view"
                )
            ) {
                return;
            }


            if (
                videoModal.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                goNext();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                goPrevious();

            }

        }
    );


    /* ==================================================
       MOUSE WHEEL
    ================================================== */

    if (projectsContainer) {

        projectsContainer.addEventListener(
            "wheel",
            event => {

                if (
                    !projectsContainer.classList.contains(
                        "all-view"
                    )
                ) {
                    return;
                }


                if (
                    videoModal.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                if (wheelLock) {
                    return;
                }


                wheelLock = true;


                if (
                    event.deltaY > 0
                ) {

                    goNext();

                } else {

                    goPrevious();

                }


                setTimeout(() => {

                    wheelLock =
                        false;

                }, 650);

            },
            {
                passive: true
            }
        );

    }


    /* ==================================================
       TOUCH SWIPE
    ================================================== */

    if (projectsContainer) {

        projectsContainer.addEventListener(
            "touchstart",
            event => {

                if (
                    !projectsContainer.classList.contains(
                        "all-view"
                    )
                ) {
                    return;
                }


                if (
                    videoModal.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                touchStartX =
                    event.touches[0].clientX;

            },
            {
                passive: true
            }
        );


        projectsContainer.addEventListener(
            "touchend",
            event => {

                if (
                    !projectsContainer.classList.contains(
                        "all-view"
                    )
                ) {
                    return;
                }


                if (
                    videoModal.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                touchEndX =
                    event.changedTouches[0].clientX;


                const distance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(distance) <
                    45
                ) {
                    return;
                }


                if (
                    distance < 0
                ) {

                    goNext();

                } else {

                    goPrevious();

                }

            },
            {
                passive: true
            }
        );

    }


    /* ==================================================
       RESIZE
    ================================================== */

    window.addEventListener(
        "resize",
        () => {

            updateAllCarousel();

        }
    );


    /* ==================================================
       DEFAULT
    ================================================== */

    const allButton =
        document.querySelector(
            '.category[data-filter="all"]'
        );


    if (allButton) {

        allButton.classList.add(
            "active"
        );

    }


    activateAllView();

});