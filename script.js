// script.js
const API_URL = 'https://script.google.com/macros/s/AKfycbzfH1gPe9CSesIVsItkvZk2IkKhI-TxuHOaZSYa7u6LdUJFnfMzzHsaR85IYWeKzYeEPA/exec';

function submitLocation(latitude, longitude) {
  console.log('Sending location data:', { latitude, longitude });
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ latitude, longitude }),
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Response from server:', data);
      if (data.status === 'success') {
        document.getElementById('status').innerText = 'Location submitted successfully!';
      } else {
        document.getElementById('status').innerText = 'Failed to submit location.';
      }
    })
    .catch(error => {
      document.getElementById('status').innerText = `Error submitting location: ${error.message}`;
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', getLocation);