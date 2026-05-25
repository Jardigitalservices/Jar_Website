(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Homepage project carousel on small screens
    var homeProjectCarouselTimer;
    function toggleHomeProjectCarousel() {
        var $projectCarousel = $(".home-project-slider");

        if (!$projectCarousel.length || !$.fn.owlCarousel) {
            return;
        }

        if (window.matchMedia("(max-width: 767.98px)").matches) {
            if (!$projectCarousel.hasClass("owl-loaded")) {
                $projectCarousel.addClass("owl-carousel home-project-carousel").owlCarousel({
                    autoplay: true,
                    autoplayTimeout: 2800,
                    autoplayHoverPause: true,
                    smartSpeed: 1000,
                    loop: true,
                    margin: 18,
                    dots: true,
                    nav: false,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1,
                            center: true
                        },
                        576: {
                            items: 2,
                            center: false
                        }
                    }
                });
            }
        } else if ($projectCarousel.hasClass("owl-loaded")) {
            $projectCarousel.trigger("destroy.owl.carousel");
            $projectCarousel.removeClass("owl-carousel owl-loaded owl-drag home-project-carousel");
            $projectCarousel.find(".owl-stage-outer").children().unwrap();
        }
    }

    toggleHomeProjectCarousel();
    $(window).on("resize", function () {
        clearTimeout(homeProjectCarouselTimer);
        homeProjectCarouselTimer = setTimeout(toggleHomeProjectCarousel, 150);
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

    // Site search
    var searchPages = [
        {
            title: "Home",
            url: "index.html",
            description: "Jar Digital Services websites, branding, online stores and social media growth"
        },
        {
            title: "About",
            url: "about.html",
            description: "About Jar Digital Services, websites, mobile apps, branding, databases, social media and custom digital solutions"
        },
        {
            title: "Services",
            url: "service.html",
            description: "Website development, mobile app development, database systems, online store setup, branding and social media management"
        },
        {
            title: "Mobile App Development",
            url: "mobile-app-development.html",
            description: "Android apps, iOS planning, business apps, booking apps, service apps and e-commerce apps"
        },
        {
            title: "Website Development",
            url: "website-development.html",
            description: "Professional mobile-friendly SEO-ready websites for businesses, individuals, startups, creators and service providers"
        },
        {
            title: "Database & Backend Systems",
            url: "database-backend-systems.html",
            description: "Databases, APIs, admin dashboards, user systems and backend tools for websites and apps"
        },
        {
            title: "Online Store Setup",
            url: "online-store-setup.html",
            description: "E-commerce store setup, product pages, payment setup, checkout flow and mobile-friendly store structure"
        },
        {
            title: "Branding & Graphic Design",
            url: "branding-graphic-design.html",
            description: "Logo design, brand identity, business cards, flyers, banners and social media graphics"
        },
        {
            title: "Social Media Management",
            url: "social-media-management.html",
            description: "Profile setup, content design, post planning, captions, promotional graphics and Google Business Profile support"
        },
        {
            title: "Projects",
            url: "project.html",
            description: "Project areas for websites, mobile apps, branding, online stores, databases, social media and custom digital solutions"
        },
        {
            title: "Blog",
            url: "blog.html",
            description: "Digital tips about websites, mobile apps, branding, social media, online stores, databases and digital growth"
        },
        {
            title: "Team",
            url: "team.html",
            description: "Jar Digital Services team support for planning, design, development, content and launch preparation"
        },
        {
            title: "Testimonials",
            url: "testimonial.html",
            description: "Client feedback page for digital design, development and online growth projects"
        },
        {
            title: "Privacy Policy",
            url: "privacy-policy.html",
            description: "How Jar Digital Services collects, uses, protects and handles visitor, inquiry and client information"
        },
        {
            title: "Terms of Service",
            url: "terms-of-service.html",
            description: "General terms for using the Jar Digital Services website and working with us on digital projects"
        },
        {
            title: "Contact",
            url: "contact.html",
            description: "Contact Jar Digital Services for a website, branding, store or social media package"
        }
    ];

    function renderSearchResults(query) {
        var $results = $('#siteSearchResults');
        if (!$results.length) return;

        var normalizedQuery = $.trim(query || '').toLowerCase();
        var results = normalizedQuery
            ? searchPages.filter(function (page) {
                return (page.title + ' ' + page.description).toLowerCase().indexOf(normalizedQuery) !== -1;
            })
            : searchPages.slice(0, 5);

        if (!results.length) {
            $results.html('<div class="site-search-empty">No results found. Try websites, branding, stores, social media, or contact.</div>');
            return;
        }

        $results.html(results.map(function (page) {
            return '<a class="site-search-result" href="' + page.url + '">' +
                '<strong>' + page.title + '</strong>' +
                '<span>' + page.description + '</span>' +
            '</a>';
        }).join(''));
    }

    $(document).on('shown.bs.modal', '#searchModal', function () {
        var $input = $('#siteSearchInput');
        renderSearchResults($input.val());
        $input.trigger('focus');
    });

    $(document).on('input', '#siteSearchInput', function () {
        renderSearchResults(this.value);
    });

    $(document).on('keydown', '#siteSearchInput', function (event) {
        if (event.key === 'Enter') {
            var firstResult = $('#siteSearchResults .site-search-result').get(0);
            if (firstResult) {
                window.location.href = firstResult.href;
            }
        }
    });

    // Language selector
    var languageOptions = {
        en: {
            label: "English",
            htmlLang: "en",
            dir: "ltr"
        },
        fa: {
            label: "دری",
            htmlLang: "prs-AF",
            dir: "rtl"
        },
        ps: {
            label: "پښتو",
            htmlLang: "ps-AF",
            dir: "rtl"
        }
    };

    function applyLanguage(languageCode) {
        var selectedLanguage = languageOptions[languageCode] ? languageCode : "en";
        var language = languageOptions[selectedLanguage];

        document.documentElement.setAttribute("lang", language.htmlLang);
        document.documentElement.setAttribute("data-site-language", selectedLanguage);
        document.documentElement.setAttribute("data-site-direction", language.dir);

        $(".language-current, .language-current-mobile").text(language.label);
        $('[data-language-option]').each(function () {
            var isActive = $(this).data("language-option") === selectedLanguage;
            $(this)
                .toggleClass("active", isActive)
                .attr("aria-current", isActive ? "true" : null);
        });

        try {
            window.localStorage.setItem("jarSelectedLanguage", selectedLanguage);
        } catch (error) {}

        window.dispatchEvent(new CustomEvent("jar:languagechange", {
            detail: {
                code: selectedLanguage,
                label: language.label,
                direction: language.dir
            }
        }));
    }

    var initialLanguage = "en";
    var documentLanguage = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    if (documentLanguage.indexOf("prs") === 0) {
        initialLanguage = "fa";
    } else if (documentLanguage.indexOf("ps") === 0) {
        initialLanguage = "ps";
    }

    applyLanguage(initialLanguage);

    $(document).on("click", "[data-language-option]", function (event) {
        applyLanguage($(this).data("language-option"));
        if (this.href) {
            return;
        }
        event.preventDefault();
    });

    // Keep root-relative internal links usable when pages are opened directly from disk.
    $(document).on("click", "a[href^='/']", function (event) {
        if (window.location.protocol !== "file:") {
            return;
        }

        var targetPath = $(this).attr("href");
        if (!targetPath || targetPath.indexOf("//") === 0) {
            return;
        }

        event.preventDefault();

        var currentPath = decodeURIComponent(window.location.pathname).replace(/\\/g, "/");
        var siteRoot = currentPath.replace(/\/(?:dr|ps)\/[^\/]*$/, "/").replace(/\/[^\/]*$/, "/");
        window.location.href = encodeURI("file://" + siteRoot + targetPath.replace(/^\//, ""));
    });

    // Contact form fallback for static hosting
    $(document).on("submit", ".jar-contact-form", function (event) {
        event.preventDefault();

        var $fields = $(this).find("input, textarea");
        var name = $.trim($fields.eq(0).val());
        var email = $.trim($fields.eq(1).val());
        var project = $.trim($fields.eq(2).val());
        var message = $.trim($fields.eq(3).val());
        var subject = project ? "Project inquiry: " + project : "Project inquiry from Jar Digital Services website";
        var body = [
            "Name: " + (name || "Not provided"),
            "Email: " + (email || "Not provided"),
            "Project / Service: " + (project || "Not provided"),
            "",
            "Message:",
            message || "Not provided"
        ].join("\n");

        window.location.href = "mailto:jar.info24@gmail.com?subject=" +
            encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });



})(jQuery);

