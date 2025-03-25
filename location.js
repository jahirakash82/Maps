// location.js
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Latitude:', latitude, 'Longitude:', longitude);
        submitLocation(latitude, longitude); // script.js থেকে ফাংশন কল
      },
      (error) => {
        document.getElementById('status').innerText = `Error: ${error.message}`;
        console.error('Geolocation Error:', error);
      }
    );
  } else {
    document.getElementById('status').innerText = 'Geolocation is not supported by your browser.';
  }
}