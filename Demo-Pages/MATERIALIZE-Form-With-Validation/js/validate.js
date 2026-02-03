// Get elements from the DOM...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fullName = document.getElementById('Full_Name');
const company = document.getElementById('Company');
const roleTitle = document.getElementById('Role_Title');
const email = document.getElementById('Email');
const phoneNumber = document.getElementById('Phone');
const zipCode = document.getElementById('Zip_Code');
const password = document.getElementById('Password');
const confirmPassword = document.getElementById('Confirm_Password');
// const submitButton = document.getElementById('Submit_Button');
// const messageBox = document.getElementById('Message_Box');

// Add event listeners...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
fullName.addEventListener("blur", validateFullName);
company.addEventListener("blur", validateCompany);
roleTitle.addEventListener("blur", validateRoleTitle);
email.addEventListener("blur", validateEmail);
phoneNumber.addEventListener("blur", validatePhoneNumber);
zipCode.addEventListener("blur", validateZipCode);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);
submitButton.addEventListener("click", validateForm);
// messageBox.addEventListener("blur", validateMessageBox);

// Create validation functions...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Full Name Validation: Must contain only letters and a single space, with each part between 2 and 20 characters
function validateFullName() {
    const namePattern = /^[a-zA-Z]{2,20}( )[a-zA-Z]{2,20}$/;
    let tempBool = false;
    if (!namePattern.test(fullName.value)) {
        fullName.classList.remove('Valid');
        fullName.classList.add('Not_Valid');
        // console.log('Full Name is not valid');
    } else {
        fullName.classList.remove('Not_Valid');
        fullName.classList.add('Valid');
        tempBool = true;
        // console.log('Full Name is valid');
    }
    return tempBool;
}


// Company Validation: Must be alphanumeric and between 2 and 30 characters
function validateCompany() {
    const companyPattern = /^[a-zA-Z0-9 ]{2,30}$/;
    let tempBool = false;
    if (!companyPattern.test(company.value) && company.value !== '') {
        company.classList.remove('Valid');
        company.classList.add('Not_Valid');
        // console.log('Company is not valid');
    } else {
        company.classList.remove('Not_Valid');
        company.classList.add('Valid');
        tempBool = true;
        // console.log('Company is valid');
    }
    return tempBool;
}

// Role/Title Validation: Must be alphanumeric and between 2 and 30 characters
function validateRoleTitle() {
    const rolePattern = /^[a-zA-Z0-9 ]{2,30}$/;
    let tempBool = false;
    if (!rolePattern.test(roleTitle.value) && roleTitle.value !== '') {
        roleTitle.classList.remove('Valid');
        roleTitle.classList.add('Not_Valid');
        // console.log('Role/Title is not valid');
    } else {
        roleTitle.classList.remove('Not_Valid');
        roleTitle.classList.add('Valid');
        tempBool = true;
        // console.log('Role/Title is valid');
    }
    return tempBool;
}

// Email Validation: Basic email format
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tempBool = false;
    if (!emailPattern.test(email.value)) {
        email.classList.remove('Valid');
        email.classList.add('Not_Valid');
        // console.log('Email is not valid');
    } else {
        email.classList.remove('Not_Valid');
        email.classList.add('Valid');
        tempBool = true;
        // console.log('Email is valid');
    }
    return tempBool;
}

// Phone Number Validation: Format xxx-xxx-xxxx
function validatePhoneNumber() {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // US phone number format
    const phonePatternAlt = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/; // Alternative format accepts (xxx) xxx-xxxx or xxx.xxx.xxxx
    let tempBool = false;
    if (!phonePatternAlt.test(phoneNumber.value) && phoneNumber.value !== '') {
        phoneNumber.classList.remove('Valid');
        phoneNumber.classList.add('Not_Valid');
        // console.log('Phone Number is not valid');
    } else {
        phoneNumber.classList.remove('Not_Valid');
        phoneNumber.classList.add('Valid');
        tempBool = true;
        // console.log('Phone Number is valid');
    }
    return tempBool;
}

// Zip Code Validation: 5 digits or 5 digits followed by a hyphen and 4 digits
function validateZipCode() {
    const zipPattern = /^\d{5}(-\d{4})?$/; // US zip code format
    let tempBool = false;
    if (!zipPattern.test(zipCode.value) && zipCode.value !== '') {
        zipCode.classList.remove('Valid');
        zipCode.classList.add('Not_Valid');
        // console.log('Zip Code is not valid');
    } else {
        zipCode.classList.remove('Not_Valid');
        zipCode.classList.add('Valid');
        tempBool = true;
        // console.log('Zip Code is valid');
    }
    return tempBool;
}

// Password Validation: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
function validatePassword() {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    let tempBool = false;
    if (!passwordPattern.test(password.value)) {
        password.classList.remove('Valid');
        password.classList.add('Not_Valid');
        // console.log('Password is not valid');
    } else {
        password.classList.remove('Not_Valid');
        password.classList.add('Valid');
        tempBool = true;
        // console.log('Password is valid');
    }
    return tempBool;
}

// Confirm Password Validation: Must match the Password field
function validateConfirmPassword() {
    let tempBool = false;
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        confirmPassword.classList.remove('Valid');
        confirmPassword.classList.add('Not_Valid');
        // console.log('Confirm Password does not match');
    } else {
        confirmPassword.classList.remove('Not_Valid');
        confirmPassword.classList.add('Valid');
        tempBool = true;
        // console.log('Confirm Password matches');
    }
    return tempBool;
}

// Form Validation on Submit: Ensure all fields are valid before submission
function validateForm() {
    let alertMsg = '';
    let boolFullName = validateFullName();
    if (!boolFullName) { alertMsg += 'Full Name is invalid.\n'; }
    let boolCompany = validateCompany();
    if (!boolCompany) { alertMsg += 'Company is invalid.\n'; }
    let boolRoleTitle = validateRoleTitle();
    if (!boolRoleTitle) { alertMsg += 'Role/Title is invalid.\n'; }
    let boolEmail = validateEmail();
    if (!boolEmail) { alertMsg += 'Email is invalid.\n'; }
    let boolPhone = validatePhoneNumber();
    if (!boolPhone) { alertMsg += 'Phone Number is invalid.\n'; }
    let boolZipCode = validateZipCode();
    if (!boolZipCode) { alertMsg += 'Zip Code is invalid.\n'; }
    let boolPassword = validatePassword();
    if (!boolPassword) { alertMsg += 'Password is invalid.\n'; }
    let boolConfirmPassword = validateConfirmPassword();
    if (!boolConfirmPassword) { alertMsg += 'Confirm Password does not match.\n'; }

    if (alertMsg !== '') {
        alert('Please correct the following errors before submitting the form:\n\n' + alertMsg);
        return;
    }
    else {
        alert('Form submitted successfully!');
        // Here you can proceed with form submission, e.g., send data to the server
    }
}

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('Email_Form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         let valid = true;
//         let messages = [];

//         // Full Name validation
//         const fullName = document.getElementById('Full_Name');
//         if (!fullName.value.trim()) {
//             valid = false;
//             messages.push('Full Name is required.');
//             fullName.classList.add('notValid');
//         } else {
//             fullName.classList.remove('notValid');
//         }

//         // Email validation
//         const email = document.getElementById('Email');
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(email.value)) {
//             valid = false;
//             messages.push('A valid Email is required.');
//             email.classList.add('notValid');
//         } else {
//             email.classList.remove('notValid');
//         }

//         // Password validation
//         const password = document.getElementById('Password');
//         const confirmPassword = document.getElementById('Confirm_Password');
//         if (!password.value) {
//             valid = false;
//             messages.push('Password is required.');
//             password.classList.add('notValid');
//         } else {
//             password.classList.remove('notValid');
//         }
//         if (password.value !== confirmPassword.value) {
//             valid = false;
//             messages.push('Passwords do not match.');
//             confirmPassword.classList.add('notValid');
//         } else {
//             confirmPassword.classList.remove('notValid');
//         }

//         // Message validation
//         const message = document.getElementById('Message');
//         if (!message.value.trim()) {
//             valid = false;
//             messages.push('Message is required.');
//             message.classList.add('notValid');
//         } else {
//             message.classList.remove('notValid');
//         }

//         // Show errors or submit
//         if (!valid) {
//             alert(messages.join('\n'));
//         } else {
//             alert('Form submitted successfully!');
//             this.reset();
//             document.querySelectorAll('.notValid').forEach(el => el.classList.remove('notValid'));
//         }
//     });
// });