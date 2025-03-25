const API_URL = 'https://script.google.com/macros/s/AKfycbx8AjeqIh51eX2rC_q7xJkjbiZJEjqbH0OMp3zNEDj7tG49wpvBYwxBHau4mlsNBp4LxQ/exec';

function submitLocation(latitude, longitude) {
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ latitude, longitude }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        document.getElementById('status').innerText = 'Location submitted successfully!';
      } else {
        document.getElementById('status').innerText = 'Failed to submit location.';
      }
    })
    .catch(error => {
      document.getElementById('status').innerText = 'Error submitting location.';
      console.error('Error:', error);
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      submitLocation(latitude, longitude);
    }, (error) => {
      document.getElementById('status').innerText = `Error: ${error.message}`;
    });
  } else {
    document.getElementById('status').innerText = 'Geolocation is not supported by your browser.';
  }
}

document.addEventListener('DOMContentLoaded', getLocation);
