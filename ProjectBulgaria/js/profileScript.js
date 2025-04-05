document.addEventListener("DOMContentLoaded", () => {
    // Password visibility toggles
    togglePassword("register-password", "toggle-register-password");
    togglePassword("register-confirm-password", "toggle-register-confirm-password");
    togglePassword("login-password", "toggle-login-password");
  });
  
  // Show/hide password functionality
  function togglePassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    
    toggle.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggle.src = "../pictures/other/hidepass.svg"; // Replace with a "hide" icon if available
      } else {
        input.type = "password";
        toggle.src = "../pictures/other/showpass.svg";
      }
    });
  }
  
  // Show login form
  function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }
  
  // Show register form
  function showRegister() {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
  }
  
  // Register functionality
  function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;
    const error = document.getElementById("register-error");
    const success = document.getElementById("register-success");
  
    error.textContent = "";
    success.textContent = "";
  
    if (!email || !password || !confirmPassword) {
      error.textContent = "All fields are required.";
      return;
    }
  
    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }
  
    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
      error.textContent = "Email already registered.";
      return;
    }
  
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    success.textContent = "Registration successful! You can now log in.";
  }
  
  // Login functionality
  function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const error = document.getElementById("login-error");
    const success = document.getElementById("login-success");
  
    error.textContent = "";
    success.textContent = "";
  
    if (!email || !password) {
      error.textContent = "All fields are required.";
      return;
    }
  
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      success.textContent = "Login successful!";
    } else {
      error.textContent = "Invalid email or password.";
    }
  }
  