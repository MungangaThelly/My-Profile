// Blog modal interactivity and reveal-on-scroll
const blogModal = document.getElementById('blogModal');
const closeBlogModal = document.getElementById('closeBlogModal');
const blogModalBody = document.getElementById('blogModalBody');
const blogPosts = {
    1: {
        title: 'How to Build Accessible Web Apps',
        content: `<p>Accessibility is about making your web content usable by everyone. Use semantic HTML, provide alt text, ensure keyboard navigation, and test with screen readers. <br><br>Key tips:<ul><li>Use <code>aria-label</code> and roles for custom widgets</li><li>Ensure color contrast</li><li>Test with Tab/Shift+Tab</li></ul></p>`
    },
    2: {
        title: 'Modern Web Security Essentials',
        content: `<p>Modern web security includes HTTPS, CSP, XSS/CSRF protection, and regular dependency audits. <br><br>Key tips:<ul><li>Always use HTTPS</li><li>Sanitize user input</li><li>Keep dependencies up to date</li></ul></p>`
    }
};

document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const id = btn.getAttribute('data-blog');
        if (blogPosts[id]) {
            blogModal.removeAttribute('hidden');
            blogModal.querySelector('#blogModalTitle').textContent = blogPosts[id].title;
            blogModalBody.innerHTML = blogPosts[id].content;
            blogModal.querySelector('.close-btn').focus();
            document.body.style.overflow = 'hidden';
        }
    });
});
closeBlogModal?.addEventListener('click', () => {
    blogModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
});
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !blogModal.hasAttribute('hidden')) {
        blogModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }
});
blogModal?.addEventListener('mousedown', e => {
    if (e.target === blogModal) {
        blogModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }
});

// Reveal on scroll for .reveal elements
function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);
// Dark mode toggle with localStorage persistence
const darkToggle = document.getElementById('darkModeToggle');
const root = document.body;
const darkPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || (!storedTheme && darkPref)) {
    root.setAttribute('data-theme', 'dark');
    darkToggle?.setAttribute('aria-pressed', 'true');
} else {
    root.setAttribute('data-theme', 'light');
    darkToggle?.setAttribute('aria-pressed', 'false');
}
darkToggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    darkToggle.setAttribute('aria-pressed', isDark ? 'false' : 'true');
});
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
