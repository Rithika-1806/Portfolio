/**
 * Rithika K | Portfolio Interactive Elements & Animations script.js
 * Enhanced with 3D Tilt Cards, dynamic particle generators, and smooth transitions.
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================================================
  // PAGE LOADER FADE-OUT
  // ==========================================================================
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }
  });

  // Fallback in case window load takes too long
  setTimeout(() => {
    if (loader && loader.style.display !== "none") {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }
  }, 2000);

  // ==========================================================================
  // STICKY HEADER
  // ==========================================================================
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ==========================================================================
  // MOBILE HAMBURGER MENU
  // ==========================================================================
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  const toggleMobileMenu = () => {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("active");
    mobileMenu.setAttribute("aria-hidden", isExpanded);
    document.body.style.overflow = isExpanded ? "auto" : "hidden"; // Prevent background scroll
  };

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("active");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
      });
    });
  }

  // ==========================================================================
  // DYNAMIC SAGE & CREAM PARTICLES GENERATOR
  // ==========================================================================
  const generateParticles = () => {
    const container = document.getElementById("particlesContainer");
    if (!container) return;

    // Reset container contents
    container.innerHTML = "";

    const count = 25; // Quiet, elegant particle count

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random sizes (4px to 10px) representing soft organic bubbles
      const size = Math.floor(Math.random() * 7) + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";

      // Random horizontal spread and starting point
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-${size + 20}px`; // Start off-screen
      
      // Retro colorful pastel block colors
      const colors = ["#88c4b7", "#f1b34c", "#f7aa94", "#7eabf3", "#b3d395", "#c4bbf0"];
      particle.style.backgroundColor = colors[Math.random() * colors.length | 0];
      
      // Speeds and stagger delays
      const duration = Math.random() * 10 + 15; // 15s to 25s
      const delay = Math.random() * 15; // stagger starts up to 15s
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);
    }
  };

  generateParticles();

  // ==========================================================================
  // 3D MAGNETIC TILT HOVER (PROJECT CARDS)
  // ==========================================================================
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Cursor position relative to card boundaries
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      const cardWidth = rect.width;
      const cardHeight = rect.height;

      const xc = cardWidth / 2;
      const yc = cardHeight / 2;

      // Max tilt angles: 6 degrees for subtle motion
      const tiltX = (yc - y) / 18;
      const tiltY = (x - xc) / 18;

      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // ==========================================================================
  // DARK MODE TOGGLE
  // ==========================================================================
  const themeToggle = document.getElementById("themeToggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark-theme");
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
      localStorage.setItem("portfolio-theme", "light");
    }
  };

  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");
      applyTheme(!isDark);
    });
  }

  // ==========================================================================
  // TYPING ANIMATION (HERO SECTION)
  // ==========================================================================
  const typingTextSpan = document.getElementById("typingText");
  const roles = [
    "Full Stack Web Developer",
    "AI-Powered App Builder",
    "Computer Science Engineer",
    "Creative Problem Solver"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeEffect = () => {
    if (!typingTextSpan) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      typingSpeed = 50; // deletion rate
    } else {
      charIndex++;
      typingSpeed = 120; // typing rate
    }

    typingTextSpan.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  };

  setTimeout(typeEffect, 1000);

  // ==========================================================================
  // PROJECT FILTERING
  // ==========================================================================
  const filterTabs = document.querySelectorAll(".filter-tab");

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterValue = tab.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-categories").split(" ");
        
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(20px) scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.02,
    rootMargin: "0px 0px -10px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================================================
  // ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll("section, footer");
  const navLinks = document.querySelectorAll(".nav-link");

  const activeScrollSpy = () => {
    let currentActiveSectionId = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + 180; // offset for sticky navbar

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute("id");
      }
    });

    if (window.scrollY < 100) {
      currentActiveSectionId = "home";
    }

    if (currentActiveSectionId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  };

  window.addEventListener("scroll", activeScrollSpy);
  activeScrollSpy();

  // ==========================================================================
  // ANIMATED STATISTIC COUNTERS
  // ==========================================================================
  const statValues = document.querySelectorAll(".stat-value");
  
  const animateCounter = (element) => {
    const target = parseFloat(element.getAttribute("data-target"));
    const decimals = parseInt(element.getAttribute("data-decimals")) || 0;
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 2200; // roll values in 2.2 seconds
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeProgress * target;

      element.textContent = currentValue.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        element.textContent = target.toFixed(decimals) + suffix;
      }
    };

    requestAnimationFrame(updateValue);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statValues.forEach(value => {
    counterObserver.observe(value);
  });

  // ==========================================================================
  // GITHUB CONTRIBUTION GRAPH MOCKUP GENERATION
  // ==========================================================================
  const githubGrid = document.getElementById("githubGrid");
  
  if (githubGrid) {
    const totalCells = 24 * 7;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.classList.add("github-cell");
      
      const randomVal = Math.random();
      let level = 0;
      if (randomVal > 0.88) level = 4;
      else if (randomVal > 0.72) level = 3;
      else if (randomVal > 0.52) level = 2;
      else if (randomVal > 0.28) level = 1;
      
      cell.classList.add(`level-${level}`);
      
      const commits = level === 0 ? "No contributions" : `${level * 2 + Math.floor(Math.random() * 3)} contributions`;
      cell.setAttribute("title", `${commits} on this day`);
      
      githubGrid.appendChild(cell);
    }
  }

  // ==========================================================================
  // BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});