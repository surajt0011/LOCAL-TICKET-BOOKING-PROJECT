// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');

    if (loginButton) {
        // Handle the login form submission
        loginButton.addEventListener('click', async () => {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('Please fill out all fields.');
                return;
            }

            try {
                // Send login data to the backend
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.text();

                if (response.status === 200) {
                    // Store login status and redirect to the homepage
                    localStorage.setItem('loggedIn', 'true');
                    window.location.href = 'index.html';
                } else {
                    // Display the error message from the server
                    alert(result);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    } else {
        console.error('Login button not found.');
    }
});


// Redirect to the Book Ticket Page
document.getElementById('bookticket1').addEventListener('click', () => {
    window.location.href = 'bookticket.html'; // Ensure this page exists
});

// Show Ticket Details
document.getElementById('showticket').addEventListener('click', () => {
    const source = localStorage.getItem('source');
    const destination = localStorage.getItem('destination');
    const nop = localStorage.getItem('nop');
    const journeyType = localStorage.getItem('journeyType');
    const ticketPrice = localStorage.getItem('ticketPrice');

    if (!source || !destination || !nop || !journeyType) {
        alert('No ticket found. Please book a ticket first.');
        return;
    }

    // Display ticket details
    alert(`
        Ticket Details:
        Source: ${source}
        Destination: ${destination}
        Number of People: ${nop}
        Journey Type: ${journeyType}
        Total Price: ₹${ticketPrice || 'Not Calculated'}
    `);
});

// Logout Functionality
document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear(); // Clear all stored data
    window.location.href = 'login.html'; // Redirect to login page
});

// Script for handling redirections
document.getElementById('book-ticket').addEventListener('click', () => {
    window.location.href = 'payment.html';
  });
  
  document.getElementById('show-ticket').addEventListener('click', () => {
    window.location.href = 'showticket.html';
  });
  
  localStorage.setItem('ticketDetails', JSON.stringify({
    source: source,
    destination: destination,
    nop: nop,
    journeyType: journeyType,
    ticketPrice: ticketPrice,
    bookingDate: currentDate
}));
