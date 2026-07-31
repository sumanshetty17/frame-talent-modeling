// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Show chosen file name(s) next to each "Choose File" button
function wireFileInput(inputId, outputId) {
  const input = document.getElementById(inputId);
  const output = document.getElementById(outputId);
  if (!input || !output) return;
  input.addEventListener('change', () => {
    if (!input.files || input.files.length === 0) {
      output.textContent = 'No file chosen';
      return;
    }
    if (input.files.length === 1) {
      output.textContent = input.files[0].name;
    } else {
      output.textContent = input.files.length + ' files selected';
    }
  });
}
wireFileInput('photos', 'photoName');
wireFileInput('video', 'videoName');

// The registration form now submits normally (no AJAX) so that photo and
// video attachments are correctly delivered by FormSubmit. After a
// successful submission, FormSubmit redirects to thankyou.html (set via
// the form's hidden "_next" field).
