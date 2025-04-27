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
const notificationsToggle = document.getElementById("notifications-toggle")
const notificationsPanel = document.getElementById("notifications-panel")
const exportDataBtn = document.getElementById("export-data-btn")
const symptomForm = document.getElementById("symptom-form")
const symptomsList = document.getElementById("symptoms-list")
const cycleInsightsContainer = document.getElementById("cycle-insights-container")

// State
let currentMonth = new Date()
let selectedDate = null
let periodDays = []
let fertileWindow = []
let isDarkMode = false
let notifications = []
let symptoms = []
let cycleInsights = {
  averageCycleLength: 28,
  averagePeriodLength: 5,
  commonSymptoms: ["cramps", "fatigue", "headache"]
}

// Initialize the app
function init() {
  // Set up event listeners
  setupEventListeners()

  // Initialize the calendar
  updateCalendarDisplay()

  // Animate staggered items
  animateStaggeredItems()

  // Initialize new features
  updateNotificationBadge()
  renderSymptoms()
  updateCycleInsights()
  
  // Add a welcome notification for demo purposes
  setTimeout(() => {
    addNotification("Welcome to Luna! Track your cycle and take control of your health.", "info")
  }, 2000)
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
  
  // Add these new event listeners
  if (notificationsToggle) {
    notificationsToggle.addEventListener("click", toggleNotifications)
  }
  
  if (exportDataBtn) {
    exportDataBtn.addEventListener("click", exportUserData)
  }
  
  if (symptomForm) {
    symptomForm.addEventListener("submit", (e) => {
      e.preventDefault()
      addSymptom()
    })
  }
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

// UI functions
function toggleMobileMenu() {
  mobileMenu.classList.add("open")
  mobileMenuOverlay.classList.add("open")
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open")
  mobileMenuOverlay.classList.remove("open")
}

function toggleTheme() {
  isDarkMode = !isDarkMode
  document.body.classList.toggle("dark", isDarkMode)

  // Update theme toggle icon
  if (isDarkMode) {
    themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        `
  } else {
    themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        `
  }
}

function showTab(tabId) {
  // Update nav links
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("onclick").includes(tabId)) {
      link.classList.add("active")
    }
  })

  // Update tab content
  tabContents.forEach((tab) => {
    tab.classList.remove("active")
  })
  document.getElementById(tabId).classList.add("active")

  // Animate staggered items in the new tab
  animateStaggeredItems()
}

function animateStaggeredItems() {
  const staggeredItems = document.querySelectorAll(".staggered-item")
  staggeredItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in")
    }, index * 100)
  })
}

// Calendar functions// Calendar functions
function updateCalendarDisplay() {
  // Update month display
  currentMonthDisplay.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    currentMonth,
  )

  // Clear existing calendar days (except header)
  const dayElements = calendarContainer.querySelectorAll(".calendar-day")
  dayElements.forEach((day) => day.remove())

  // Get first day of month and last day of month
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyCell = document.createElement("div")
    calendarContainer.appendChild(emptyCell)
  }
function updateCalendarDisplay() {
  // Update month display
  currentMonthDisplay.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    currentMonth,
  )

  // Clear existing calendar days (except header)
  const dayElements = calendarContainer.querySelectorAll(".calendar-day")
  dayElements.forEach((day) => day.remove())

  // Get first day of month and last day of month
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyCell = document.createElement("div")
    calendarContainer.appendChild(emptyCell)
  }

  // Add days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dayElement = document.createElement("button")
    dayElement.classList.add("calendar-day")
    dayElement.textContent = day

    // Check if this day is a period day or fertile day
    if (periodDays.some((d) => isSameDay(d, date))) {
      dayElement.classList.add("period")
    } else if (fertileWindow.some((d) => isSameDay(d, date))) {
      dayElement.classList.add("fertile")
    }

    // Check if this day is selected
    if (selectedDate && isSameDay(date, selectedDate)) {
      dayElement.classList.add("selected")
    }

    // Add click event
    dayElement.addEventListener("click", () => {
      handleCalendarDayClick(date, dayElement)
    })

    calendarContainer.appendChild(dayElement)
  }
}

function handleCalendarDayClick(date, element) {
  // Toggle selection
  if (selectedDate && isSameDay(date, selectedDate)) {
    selectedDate = null
    element.classList.remove("selected")
  } else {
    // Remove selected class from previously selected day
    const selectedElement = document.querySelector(".calendar-day.selected")
    if (selectedElement) {
      selectedElement.classList.remove("selected")
    }

    selectedDate = date
    element.classList.add("selected")
  }

  // Toggle period day
  if (periodDays.some((d) => isSameDay(d, date))) {
    periodDays = periodDays.filter((d) => !isSameDay(d, date))
    element.classList.remove("period")
  } else {
    periodDays.push(date)
    element.classList.add("period")
    element.classList.remove("fertile") // Can't be both period and fertile
  }
}

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Period calculator functions
function calculateNextPeriod() {
  const lastPeriodInput = document.getElementById("lastPeriod")
  const cycleDurationInput = document.getElementById("cycleDuration")

  if (!lastPeriodInput.value) {
    alert("Please select your last period date")
    return
  }

  const lastPeriod = new Date(lastPeriodInput.value)
  const cycleDuration = Number.parseInt(cycleDurationInput.value)

  // Calculate next period
  const nextPeriod = new Date(lastPeriod)
  nextPeriod.setDate(lastPeriod.getDate() + cycleDuration)

  // Calculate fertile window
  const fertileStart = new Date(nextPeriod)
  fertileStart.setDate(nextPeriod.getDate() - 16)
  const fertileEnd = new Date(nextPeriod)
  fertileEnd.setDate(nextPeriod.getDate() - 12)

  // Calculate days until next period
  const today = new Date()
  const daysUntil = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24))

  // Update result display
  document.getElementById("next-period-date").textContent = formatDate(nextPeriod)
  document.getElementById("fertile-window").textContent = `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`
  document.getElementById("days-until").textContent = `${daysUntil} days`
  document.getElementById("cycle-length").textContent = `${cycleDuration} days`

  // Update stats display
  document.getElementById("last-period-display").textContent = formatDate(lastPeriod, "short")
  document.getElementById("next-period-display").textContent = formatDate(nextPeriod, "short")

  // Show result
  document.getElementById("period-result").classList.remove("hidden")

  // Update calendar
  updateCalendarWithPeriodData(lastPeriod, nextPeriod, fertileStart, fertileEnd)
}

function updateCalendarWithPeriodData(lastPeriod, nextPeriod, fertileStart, fertileEnd) {
  // Clear existing period and fertile days
  periodDays = []
  fertileWindow = []

  // Add period days (assuming 5-day period)
  for (let i = 0; i < 5; i++) {
    const periodDay = new Date(lastPeriod)
    periodDay.setDate(lastPeriod.getDate() + i)
    periodDays.push(periodDay)

    const nextPeriodDay = new Date(nextPeriod)
    nextPeriodDay.setDate(nextPeriod.getDate() + i)
    periodDays.push(nextPeriodDay)
  }

  // Add fertile window days
  const currentFertileDay = new Date(fertileStart)
  while (currentFertileDay <= fertileEnd) {
    fertileWindow.push(new Date(currentFertileDay))
    currentFertileDay.setDate(currentFertileDay.getDate() + 1)
  }

  // Update calendar display
  updateCalendarDisplay()
}

// Mood tracker functions
function analyzeMood() {
  const energy = document.getElementById("energy").value
  const comfort = document.getElementById("comfort").value
  const emotion = document.getElementById("emotion").value

  if (!energy || !comfort || !emotion) {
    alert("Please fill in all fields")
    return
  }

  let moodEmoji = ""
  let moodTitle = ""
  let recommendation = ""

  // Analyze mood based on combinations
  if (energy === "high" && comfort === "good" && ["happy", "neutral"].includes(emotion)) {
    moodEmoji = "🌟"
    moodTitle = "Fantastic Day!"
    recommendation = "Your mood is great! Perfect time for activities you enjoy."
  } else if (energy === "low" && comfort === "pain") {
    moodEmoji = "🫂"
    moodTitle = "Need Extra Care"
    recommendation = "Take it easy today. Try some relaxation techniques and consider a warm bath."
  } else if (emotion === "anxious" || emotion === "irritated") {
    moodEmoji = "😤"
    moodTitle = "Feeling Tense"
    recommendation = "Try some deep breathing exercises or meditation to help calm your mind."
  } else if (emotion === "sad") {
    moodEmoji = "💜"
    moodTitle = "Need Support"
    recommendation = "Be gentle with yourself today. Consider talking to a friend or doing something you enjoy."
  } else {
    moodEmoji = "😌"
    moodTitle = "Balanced"
    recommendation = "You're doing okay! Maintain this balance with regular self-care."
  }

  // Update result display
  document.getElementById("mood-emoji").textContent = moodEmoji
  document.getElementById("mood-title").textContent = moodTitle
  document.getElementById("mood-recommendation").textContent = recommendation

  // Show result with animation
  const moodResult = document.getElementById("mood-result")
  moodResult.classList.remove("hidden")

  // Animate staggered items
  const staggeredItems = moodResult.querySelectorAll(".staggered-item")
  staggeredItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in")
    }, index * 100)
  })
}

// Form submission functions
function submitFeedback() {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const rating = document.getElementById("rating").value
  const message = document.getElementById("message").value

  // In a real app, you would send this data to a backend
  alert(`Thank you for your feedback, ${name}!`)
  document.getElementById("feedback-form").reset()
}

function submitHealthData() {
  const age = document.getElementById("age").value
  const regularity = document.getElementById("regularity").value
  const symptoms = document.getElementById("symptoms").value

  // In a real app, you would send this data to a backend
  alert("Thank you for sharing your experience. Your data helps us provide better insights.")
  document.getElementById("health-form").reset()
}

// Helper functions
function formatDate(date, format = "long") {
  if (format === "long") {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  } else {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }
}

// Notifications functions
function toggleNotifications() {
  notificationsPanel.classList.toggle("open")
}

function addNotification(message, type = "info") {
  const notification = {
    id: Date.now(),
    message,
    type,
    read: false,
    timestamp: new Date()
  }
  
  notifications.unshift(notification)
  
  // Update notification badge
  updateNotificationBadge()
  
  // Update notifications panel if open
  if (notificationsPanel.classList.contains("open")) {
    renderNotifications()
  }
}

function updateNotificationBadge() {
  const unreadCount = notifications.filter(n => !n.read).length
  const badge = document.getElementById("notifications-badge")
  
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount
      badge.classList.remove("hidden")
    } else {
      badge.classList.add("hidden")
    }
  }
}

function renderNotifications() {
  const notificationsList = document.getElementById("notifications-list")
  
  if (!notificationsList) return
  
  notificationsList.innerHTML = ""
  
  if (notifications.length === 0) {
    notificationsList.innerHTML = `<div class="p-4 text-center text-gray-500">No notifications</div>`
    return
  }
  
  notifications.forEach(notification => {
    const notificationEl = document.createElement("div")
    notificationEl.classList.add("notification-item")
    if (notification.read) {
      notificationEl.classList.add("read")
    }
    
    notificationEl.innerHTML = `
      <div class="notification-content">
        <p class="notification-message">${notification.message}</p>
        <span class="notification-time">${formatTimeAgo(notification.timestamp)}</span>
      </div>
      <button class="notification-action" data-id="${notification.id}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    `
    
    notificationsList.appendChild(notificationEl)
    
    // Add event listener to mark as read/delete
    notificationEl.querySelector(".notification-action").addEventListener("click", () => {
      removeNotification(notification.id)
    })
    
    // Mark as read when viewed
    if (!notification.read) {
      notification.read = true
      updateNotificationBadge()
    }
  })
}

function removeNotification(id) {
  notifications = notifications.filter(n => n.id !== id)
  renderNotifications()
  updateNotificationBadge()
}

function formatTimeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) {
    return "just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

// Data export function
function exportUserData() {
  const userData = {
    periodDays,
    fertileWindow,
    symptoms,
    cycleInsights,
    lastExport: new Date()
  }
  
  // Convert to JSON string
  const dataStr = JSON.stringify(userData, null, 2)
  
  // Create a blob and download link
  const blob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement("a")
  a.href = url
  a.download = `luna_data_${formatDate(new Date(), "short").replace(/\s/g, "_")}.json`
  document.body.appendChild(a)
  a.click()
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
  
  // Add notification
  addNotification("Your data has been exported successfully", "success")
}

// Symptom tracking functions
function addSymptom() {
  const symptomInput = document.getElementById("symptom-input")
  const severityInput = document.getElementById("symptom-severity")
  
  if (!symptomInput || !symptomInput.value.trim()) return
  
  const symptom = {
    id: Date.now(),
    name: symptomInput.value.trim(),
    severity: severityInput ? severityInput.value : "moderate",
    date: new Date()
  }
  
  symptoms.push(symptom)
  
  // Update UI
  renderSymptoms()
  
  // Reset form
  symptomInput.value = ""
  if (severityInput) severityInput.value = "moderate"
  
  // Update insights
  updateCycleInsights()
}

function renderSymptoms() {
  if (!symptomsList) return
  
  symptomsList.innerHTML = ""
  
  if (symptoms.length === 0) {
    symptomsList.innerHTML = `<div class="p-4 text-center text-gray-500">No symptoms recorded</div>`
    return
  }
  
  // Group symptoms by date
  const groupedSymptoms = {}
  symptoms.forEach(symptom => {
    const dateKey = formatDate(symptom.date, "short")
    if (!groupedSymptoms[dateKey]) {
      groupedSymptoms[dateKey] = []
    }
    groupedSymptoms[dateKey].push(symptom)
  })
  
  // Render grouped symptoms
  Object.keys(groupedSymptoms).forEach(date => {
    const dateGroup = document.createElement("div")
    dateGroup.classList.add("symptom-date-group")
    
    dateGroup.innerHTML = `<h4 class="text-sm font-medium text-gray-500 mb-2">${date}</h4>`
    
    const symptomItems = document.createElement("div")
    symptomItems.classList.add("space-y-2")
    
    groupedSymptoms[date].forEach(symptom => {
      const symptomItem = document.createElement("div")
      symptomItem.classList.add("symptom-item")
      
      // Set color based on severity
      let severityColor = "bg-yellow-100"
      if (symptom.severity === "mild") severityColor = "bg-green-100"
      if (symptom.severity === "severe") severityColor = "bg-red-100"
      
      symptomItem.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="w-2 h-2 rounded-full ${severityColor} mr-2"></span>
            <span>${symptom.name}</span>
          </div>
          <span class="text-xs text-gray-500">${symptom.severity}</span>
        </div>
      `
      
      symptomItems.appendChild(symptomItem)
    })
    
    dateGroup.appendChild(symptomItems)
    symptomsList.appendChild(dateGroup)
  })
}

// Cycle insights functions
function updateCycleInsights() {
  if (!cycleInsightsContainer) return
  
  // In a real app, this would calculate insights based on user data
  // For demo purposes, we'll just update the UI with sample data
  
  cycleInsightsContainer.innerHTML = `
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="bg-gray-100 rounded-lg p-4 text-center">
        <p class="text-sm text-gray-500">Avg. Cycle</p>
        <p class="text-2xl font-bold">${cycleInsights.averageCycleLength} days</p>
      </div>
      <div class="bg-gray-100 rounded-lg p-4 text-center">
        <p class="text-sm text-gray-500">Avg. Period</p>
        <p class="text-2xl font-bold">${cycleInsights.averagePeriodLength} days</p>
      </div>
    </div>
    
    <h4 class="font-medium mb-2">Common Symptoms</h4>
    <div class="flex flex-wrap gap-2 mb-4">
      ${cycleInsights.commonSymptoms.map(symptom => 
        `<span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">${symptom}</span>`
      ).join('')}
    </div>
    
    <h4 class="font-medium mb-2">Recommendations</h4>
    <p class="text-sm text-gray-600">Based on your cycle patterns, consider tracking your mood 7-10 days before your expected period to identify PMS patterns.</p>
  `
}

// Initialize the app
document.addEventListener("DOMContentLoaded", init)
}
