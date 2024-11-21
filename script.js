// Get the elements
const openFormBtn = document.getElementById('openFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const contactFormPopup = document.getElementById('contactFormPopup');

// Open the popup form
openFormBtn.addEventListener('click', () => {
    contactFormPopup.style.display = 'block';
});

// Close the popup form
closeFormBtn.addEventListener('click', () => {
    contactFormPopup.style.display = 'none';
});

// Close the form if the user clicks outside the form container
window.addEventListener('click', (e) => {
    if (e.target === contactFormPopup) {
        contactFormPopup.style.display = 'none';
    }
});
