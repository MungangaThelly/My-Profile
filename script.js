// Accessible dialog + simple form handling
const openFormBtn = document.getElementById('openFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const dialog = document.getElementById('contactFormPopup');
const form = document.getElementById('contactForm');
const statusEl = document.querySelector('.form-status');

let lastFocusedBeforeDialog = null;

const focusSelectors = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])', 'textarea:not([disabled])',
    'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'
];

function getFocusable() {
    return [...dialog.querySelectorAll(focusSelectors.join(','))].filter(el => !el.hasAttribute('hidden'));
}

function openDialog() {
    if (!dialog.hasAttribute('hidden')) return; // already open
    lastFocusedBeforeDialog = document.activeElement;
    dialog.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    const focusable = getFocusable();
    const first = focusable[0];
    first && first.focus();
}

function closeDialog() {
    if (dialog.hasAttribute('hidden')) return;
    dialog.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocusedBeforeDialog) lastFocusedBeforeDialog.focus();
}

openFormBtn?.addEventListener('click', openDialog);
closeFormBtn?.addEventListener('click', closeDialog);

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (!dialog.hasAttribute('hidden')) {
            e.stopPropagation();
            closeDialog();
        }
    }
    if (e.key === 'Tab' && !dialog.hasAttribute('hidden')) {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

dialog.addEventListener('mousedown', e => {
    if (e.target === dialog) {
        closeDialog();
    }
});

form?.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    if (!name || !email || !message) {
        statusEl.hidden = false;
        statusEl.textContent = 'Please fill all required fields.';
        return;
    }
    // Placeholder success (no backend wired yet)
    statusEl.hidden = false;
    statusEl.textContent = 'Message prepared (demo only). Thank you!';
    form.reset();
    setTimeout(closeDialog, 1500);
});

// Dynamic current year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
