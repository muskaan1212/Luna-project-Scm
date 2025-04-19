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

