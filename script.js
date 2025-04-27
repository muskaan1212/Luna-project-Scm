//DOM elements
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
   }
   
 else {
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
 // Calendar functions
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
   } 
   else {
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
