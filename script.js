// DOM Elements
const loginPage = document.getElementById("login-page")
const dashboardPage = document.getElementById("dashboard-page")
const loginForm = document.getElementById("login-form-element")
const registerForm = document.getElementById("register-form-element")
const authTabs = document.querySelectorAll(".auth-tab")
const authForms = document.querySelectorAll(".auth-form")
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const mobileMenu = document.getElementById("mobile-menu")
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay")
const mobileMenuClose = document.getElementById("mobile-menu-close")
const themeToggle = document.getElementById("theme-toggle")
const navLinks = document.querySelectorAll(".nav-link")
const tabContents = document.querySelectorAll(".tab-content")
const prevMonthBtn = document.getElementById("prev-month")
const nextMonthBtn = document.getElementById("next-month")
const currentMonthDisplay = document.getElementById("current-month-display")
const calendarContainer = document.getElementById("calendar-container")
const feedbackForm = document.getElementById("feedback-form")
const healthForm = document.getElementById("health-form")

// State
let currentMonth = new Date()
let selectedDate = null
let periodDays = []
let fertileWindow = []
let isDarkMode = false

// Initialize the app
function init() {
  // Set up event listeners
  setupEventListeners()

  // Initialize the calendar
  updateCalendarDisplay()

  // Animate staggered items
  animateStaggeredItems()
}

// Set up event listeners
function setupEventListeners() {
  // Auth tabs
  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab")
      authTabs.forEach((t) => t.classList.remove("active"))
      authForms.forEach((f) => f.classList.remove("active"))
      tab.classList.add("active")
      document.getElementById(`${tabId}-form`).classList.add("active")
    })
  })

  // Login form
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    login()
  })

  // Register form
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    register()
  })

  // Mobile menu
  mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  mobileMenuClose.addEventListener("click", closeMobileMenu)
  mobileMenuOverlay.addEventListener("click", closeMobileMenu)
// Theme toggle 
  themeToggle.addEventListener("click", toggleTheme)

  // Calendar navigation
  prevMonthBtn.addEventListener("click", () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    updateCalendarDisplay()
  })

  nextMonthBtn.addEventListener("click", () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    updateCalendarDisplay()
  })

  // Forms
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault()
    submitFeedback()
  })

  healthForm.addEventListener("submit", (e) => {
    e.preventDefault()
    submitHealthData()
  })
}

// Authentication functions
function login() {
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }
// In a real app, you would authenticate with a backend
  // For demo purposes, we'll just simulate a successful login
  setTimeout(() => {
    loginPage.classList.add("hidden")
    dashboardPage.classList.remove("hidden")

<<<<<<< Updated upstream
    // Animate nav items
    document.querySelectorAll(".nav-item").forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("slide-in")
      }, index * 100)
    })
  }, 1000)
}

function register() {
  const name = document.getElementById("register-name").value
  const email = document.getElementById("register-email").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm-password").value

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }
// In a real app, you would register with a backend
  // For demo purposes, we'll just simulate a successful registration
  setTimeout(() => {
    loginPage.classList.add("hidden")
    dashboardPage.classList.remove("hidden")

    // Animate nav items
    document.querySelectorAll(".nav-item").forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("slide-in")
      }, index * 100)
    })
  }, 1000)
}

function logout() {
  dashboardPage.classList.add("hidden")
  loginPage.classList.remove("hidden")
}
=======
>>>>>>> Stashed changes
