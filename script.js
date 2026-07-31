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

// Registration form: submit via FormSubmit's AJAX endpoint so we can
// show our own "details secured" message without leaving the page.
const modelForm = document.getElementById('modelForm');
if (modelForm) {
  const submitBtn = document.getElementById('submitBtn');
  const statusPanel = document.getElementById('statusPanel');

  function handleSubmit(e) {
    e.preventDefault();

    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Submitting…';
    submitBtn.disabled = true;

    const formData = new FormData(modelForm);
    // FormSubmit's AJAX endpoint mirrors the action email, but returns JSON
    // instead of redirecting, so we can show a custom confirmation here.
    const ajaxAction = modelForm.action.replace(
      'formsubmit.co/',
      'formsubmit.co/ajax/'
    );

    fetch(ajaxAction, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
      })
      .then(() => {
        modelForm.style.display = 'none';
        statusPanel.classList.add('show');
        statusPanel.classList.remove('error');
        statusPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(() => {
        // Fall back to a normal form submission (also covers FormSubmit's
        // one-time activation step on the very first submission to a new
        // email address).
        modelForm.removeEventListener('submit', handleSubmit);
        modelForm.submit();
      })
      .finally(() => {
        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
      });
  }

  modelForm.addEventListener('submit', handleSubmit);
}
