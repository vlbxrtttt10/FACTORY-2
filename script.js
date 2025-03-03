document.addEventListener("DOMContentLoaded", () => {
  // Verificar el tema al cargar la página y actualizar los logos
  const checkThemeAndUpdateLogos = () => {
    const isDarkMode = document.body.classList.contains("dark-mode") || localStorage.getItem("theme") === "dark"

    if (isDarkMode && !document.body.classList.contains("dark-mode")) {
      document.body.classList.add("dark-mode")
    }

    // Actualizar todos los logos
    const logos = document.querySelectorAll(".logo img, .footer-logo img")
    logos.forEach((logo) => {
      logo.src = isDarkMode ? "assets/Logo blanco.png" : "assets/EP LOGO.png"
    })
  }

  // Ejecutar al inicio
  checkThemeAndUpdateLogos()

  // Preloader
  const preloader = document.createElement("div")
  preloader.className = "preloader"
  preloader.innerHTML = '<div class="loader"></div>'
  document.body.appendChild(preloader)

  // Hide preloader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden")
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }, 1000)
  })

  // Custom cursor
  const cursorDot = document.createElement("div")
  const cursorOutline = document.createElement("div")
  cursorDot.className = "cursor-dot"
  cursorOutline.className = "cursor-outline"
  document.body.appendChild(cursorDot)
  document.body.appendChild(cursorOutline)

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`
    cursorDot.style.top = `${e.clientY}px`

    // Add slight delay to outline for smooth effect
    setTimeout(() => {
      cursorOutline.style.left = `${e.clientX}px`
      cursorOutline.style.top = `${e.clientY}px`
    }, 50)
  })

  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .btn, .hamburger, .theme-toggle, input, textarea")
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorOutline.style.border = "2px solid rgba(248, 189, 36, 0.2)"
      cursorOutline.style.backgroundColor = "rgba(248, 189, 36, 0.1)"
    })

    element.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.border = "2px solid var(--primary-color)"
      cursorOutline.style.backgroundColor = "transparent"
    })
  })

  // Hide cursor when mouse leaves window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursorDot.style.opacity = "0"
      cursorOutline.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursorDot.style.opacity = "1"
    cursorOutline.style.opacity = "1"
  })

  // Add floating shapes to sections
  const sections = document.querySelectorAll(".hero, .about-preview, .services-preview, .workflow")
  sections.forEach((section) => {
    for (let i = 0; i < 3; i++) {
      const shape = document.createElement("div")
      shape.className = `floating-shape shape-${i + 1}`
      section.appendChild(shape)
    }
  })

  // Add animation classes to elements
  const animationElements = document.querySelectorAll(".hero-image, .about-image, .service-image img, .workflow-cta")
  animationElements.forEach((element) => {
    element.classList.add("animate-float")
  })

  const pulseElements = document.querySelectorAll(".btn-primary, .step-number, .value-card i, .team-value i")
  pulseElements.forEach((element) => {
    element.classList.add("animate-pulse")
  })

  // Detectar scroll para cambiar el header
  const header = document.querySelector("header")
  const scrollThreshold = 50

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll() // Verificar al cargar la página

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const menu = document.querySelector(".menu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active")
      hamburger.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (menu && menu.classList.contains("active") && !e.target.closest(".menu") && !e.target.closest(".hamburger")) {
      menu.classList.remove("active")
      hamburger.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })

  // Dark mode toggle
  const createThemeToggle = () => {
    const nav = document.querySelector("nav")
    if (!nav) return

    const themeToggle = document.createElement("button")
    themeToggle.className = "theme-toggle"
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    themeToggle.setAttribute("aria-label", "Toggle dark mode")

    // Función para cambiar los logos según el modo
    const updateLogos = (isDarkMode) => {
      // Cambiar el logo del header
      const headerLogo = document.querySelector(".logo img")
      if (headerLogo) {
        headerLogo.src = isDarkMode ? "assets/Logo blanco.png" : "assets/EP LOGO.png"
      }

      // Cambiar el logo del footer
      const footerLogo = document.querySelector(".footer-logo img")
      if (footerLogo) {
        footerLogo.src = isDarkMode ? "assets/Logo blanco.png" : "assets/EP LOGO.png"
      }
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")
      const isDarkMode = document.body.classList.contains("dark-mode")

      if (isDarkMode) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }

      // Actualizar los logos
      updateLogos(isDarkMode)
    })

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      // Actualizar los logos al cargar la página si está en modo oscuro
      updateLogos(true)
    }

    nav.appendChild(themeToggle)
  }

  createThemeToggle()

  // Back to top button
  const createBackToTopButton = () => {
    const backToTop = document.createElement("div")
    backToTop.className = "back-to-top"
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>'
    backToTop.setAttribute("aria-label", "Back to top")
    document.body.appendChild(backToTop)

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("visible")
      } else {
        backToTop.classList.remove("visible")
      }
    })
  }

  createBackToTopButton()

  // Desplazamiento suave para enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Update URL without page reload
        history.pushState(null, null, targetId)
      }
    })
  })

  // Animación de elementos al hacer scroll
  const animateElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .zoom-in, .rotate-in",
  )

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85

    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        element.classList.add("active")
      }
    })
  }

  // Configurar animaciones basadas en la posición de los elementos
  function setupAnimations() {
    // Animaciones de la sección hero
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      heroContent.querySelector("h1").classList.add("slide-in-left")
      heroContent.querySelector("p").classList.add("slide-in-left", "delay-100")
      heroContent.querySelector(".hero-buttons").classList.add("slide-in-left", "delay-200")
    }

    // Animaciones de la sección about
    const aboutContent = document.querySelector(".about-content")
    if (aboutContent) {
      aboutContent.querySelector("h2").classList.add("fade-in")
      const valueItems = aboutContent.querySelectorAll(".value-item")
      valueItems.forEach((item, index) => {
        item.classList.add("fade-in", `delay-${(index + 1) * 100}`)
      })
    }

    // Animaciones de servicios
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card, index) => {
      if (index % 2 === 0) {
        card.querySelector(".service-content").classList.add("slide-in-right")
      } else {
        card.querySelector(".service-content").classList.add("slide-in-left")
      }
    })

    // Animaciones de workflow
    const workflowSteps = document.querySelectorAll(".workflow-step")
    workflowSteps.forEach((step, index) => {
      step.classList.add("scale-in", `delay-${(index + 1) * 100}`)
    })

    // Animaciones del formulario de contacto
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.classList.add("fade-in")
      const formGroups = contactForm.querySelectorAll(".form-group")
      formGroups.forEach((group, index) => {
        group.classList.add("slide-in-right", `delay-${(index + 1) * 100}`)
      })
    }

    // Animaciones de valores del equipo
    const teamValues = document.querySelectorAll(".team-value")
    teamValues.forEach((value, index) => {
      value.classList.add("scale-in", `delay-${(index + 1) * 100}`)
    })

    // Animaciones de características de servicio
    const features = document.querySelectorAll(".feature")
    features.forEach((feature, index) => {
      feature.classList.add("fade-in", `delay-${(index + 1) * 100}`)
    })
  }

  // Inicializar animaciones
  setupAnimations()

  // Verificar animaciones al hacer scroll
  window.addEventListener("scroll", checkScroll)
  checkScroll() // Verificar al cargar la página

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Validación y envío del formulario de contacto
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const nombre = document.getElementById("nombre").value
      const email = document.getElementById("email").value
      const telefono = document.getElementById("telefono").value
      const mensaje = document.getElementById("mensaje").value

      // Validate form
      if (!nombre || !email || !telefono || !mensaje) {
        showFormError("Por favor, complete todos los campos obligatorios.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showFormError("Por favor, ingrese un correo electrónico válido.")
        return
      }

      // Phone validation
      const phoneRegex = /^\d{9,}$/
      if (!phoneRegex.test(telefono.replace(/\D/g, ""))) {
        showFormError("Por favor, ingrese un número de teléfono válido (mínimo 9 dígitos).")
        return
      }

      // Show success message with animation
      showFormSuccess()

      // Reset form after delay
      setTimeout(() => {
        contactForm.reset()
      }, 3000)

      // In a real implementation, you would send the data to a server here
      // using fetch or XMLHttpRequest
    })
  }

  // Función para mostrar mensaje de error con animación
  function showFormError(message) {
    // Remove any existing messages
    removeFormMessages()

    // Create error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-message error-message"
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

    // Add to form
    contactForm.prepend(errorDiv)

    // Add animation
    setTimeout(() => {
      errorDiv.classList.add("show")
    }, 10)

    // Remove after delay
    setTimeout(() => {
      errorDiv.classList.remove("show")
      setTimeout(() => {
        errorDiv.remove()
      }, 300)
    }, 5000)
  }

  // Función para mostrar mensaje de éxito con animación
  function showFormSuccess() {
    // Remove any existing messages
    removeFormMessages()

    // Create success message
    const successDiv = document.createElement("div")
    successDiv.className = "form-message success-message"
    successDiv.innerHTML =
      '<i class="fas fa-check-circle"></i> ¡Gracias por contactarnos! Te responderemos a la brevedad.'

    // Add to form
    contactForm.prepend(successDiv)

    // Add animation
    setTimeout(() => {
      successDiv.classList.add("show")
    }, 10)

    // Remove after delay
    setTimeout(() => {
      successDiv.classList.remove("show")
      setTimeout(() => {
        successDiv.remove()
      }, 300)
    }, 5000)
  }

  // Eliminar mensajes del formulario
  function removeFormMessages() {
    const messages = document.querySelectorAll(".form-message")
    messages.forEach((message) => {
      message.remove()
    })
  }

  // Efecto parallax para fondos de secciones
  function parallaxEffect() {
    const parallaxElements = document.querySelectorAll(".hero, .about-preview, .services-preview, .workflow")

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset

      parallaxElements.forEach((element) => {
        const elementTop = element.offsetTop
        const elementHeight = element.offsetHeight

        // Check if element is in viewport
        if (scrollTop > elementTop - window.innerHeight && scrollTop < elementTop + elementHeight) {
          const speed = 0.1
          const yPos = -(scrollTop - elementTop) * speed

          // Apply parallax effect to pseudo-elements
          element.style.backgroundPositionY = yPos + "px"
        }
      })
    })
  }

  // Initialize parallax effect
  parallaxEffect()

  // Tarjetas de servicio interactivas
  const serviceCardsElements = document.querySelectorAll(".service-card")
  serviceCardsElements.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("active")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("active")
    })
  })

  // Add CSS for active service cards
  const serviceCardStyle = document.createElement("style")
  serviceCardStyle.textContent = `
    .service-card.active {
        transform: translateY(-15px) scale(1.02);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
    }
    
    .service-card.active .service-image img {
        transform: scale(1.08);
    }
`
  document.head.appendChild(serviceCardStyle)

  // Contador animado para pasos de workflow
  function animateCounter() {
    const stepNumbers = document.querySelectorAll(".step-number")

    stepNumbers.forEach((step, index) => {
      const number = index + 1
      let count = 0

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const interval = setInterval(() => {
                count++
                step.textContent = count

                if (count >= number) {
                  clearInterval(interval)
                }
              }, 100)

              observer.unobserve(step)
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(step)
    })
  }

  // Initialize counter animation
  animateCounter()

  // Create favicon from logo
  function createFavicon() {
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link")
    link.type = "image/x-icon"
    link.rel = "shortcut icon"
    link.href = "assets/favicon.ico"
    document.getElementsByTagName("head")[0].appendChild(link)
  }

  createFavicon()

  // Add hover effect to navigation links
  const navLinks = document.querySelectorAll(".menu a")
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.classList.add("hover-effect")
    })

    link.addEventListener("mouseleave", function () {
      this.classList.remove("hover-effect")
    })
  })

  // Add CSS for nav link hover effect
  const navStyle = document.createElement("style")
  navStyle.textContent = `
    .menu a.hover-effect {
        transform: translateY(-3px);
    }
`
  document.head.appendChild(navStyle)

  // Add particles background
  function createParticles() {
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    document.body.appendChild(particlesContainer)

    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      // Random size
      const size = Math.random() * 5 + 1

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1

      // Random animation duration
      const duration = Math.random() * 20 + 10

      // Set styles
      particle.style.cssText = `
      position: absolute;
      top: ${posY}%;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      background-color: var(--primary-color);
      border-radius: 50%;
      opacity: ${opacity};
      animation: float ${duration}s ease-in-out infinite alternate;
      pointer-events: none;
    `

      particlesContainer.appendChild(particle)
    }
  }

  // Initialize particles
  createParticles()

  // Page transition effects
  function setupPageTransitions() {
    const transitionStyle = document.createElement("style")
    transitionStyle.textContent = `
    .page-transition {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      z-index: 9999;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    }
    
    .page-transition.active {
      transform: translateY(0);
    }
    
    .page-transition.exit {
      transform: translateY(-100%);
    }
  `
    document.head.appendChild(transitionStyle)

    // Create transition element
    const transitionElement = document.createElement("div")
    transitionElement.className = "page-transition"
    document.body.appendChild(transitionElement)

    // Add transition to internal links
    document
      .querySelectorAll('a:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])')
      .forEach((link) => {
        if (link.hostname === window.location.hostname) {
          link.addEventListener("click", function (e) {
            e.preventDefault()
            const href = this.getAttribute("href")

            // Activate transition
            transitionElement.classList.add("active")

            // Navigate after transition
            setTimeout(() => {
              window.location.href = href
            }, 600)
          })
        }
      })

    // Handle page load transition
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        transitionElement.classList.add("active")
        setTimeout(() => {
          transitionElement.classList.add("exit")
          setTimeout(() => {
            transitionElement.classList.remove("active", "exit")
          }, 600)
        }, 10)
      }
    })
  }

  // Initialize page transitions
  setupPageTransitions()

  // Add 3D tilt effect to cards
  function setupTiltEffect() {
    const tiltElements = document.querySelectorAll(".service-card, .workflow-step, .value-card, .team-value")

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const xPercent = x / rect.width
        const yPercent = y / rect.height

        const rotateX = (0.5 - yPercent) * 10
        const rotateY = (xPercent - 0.5) * 10

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      })

      element.addEventListener("mouseleave", function () {
        this.style.transform = ""
      })
    })
  }

  // Initialize tilt effect
  setupTiltEffect()
})

