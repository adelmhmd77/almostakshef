        // Function to generate a random code
        function generateCode() {
            return Math.floor(1000 + Math.random() * 9000);
        }

        // Event listener for form submission
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting in the usual way

            // Get form data
            const name = document.getElementById('rname').value;
            const age = document.getElementById('rage').value;
            const phone = document.getElementById('rphone').value;

            // Check if user already exists in localStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let existingUser = users.find(user => user.phone === phone);

            if (existingUser) {
                // If the user exists, just show their code
                alert(`Welcome back! Your code is: ${existingUser.code}`);
            } else {
                // If the user doesn't exist, generate a new code
                const code = generateCode();

                // Store user data in localStorage
                const userData = {
                    name: name,
                    age: age,
                    phone: phone,
                    code: code
                };

                // Add the new user to the users array
                users.push(userData);

                // Save the updated users array back to localStorage
                localStorage.setItem('users', JSON.stringify(users));

                // Show success message
                alert(`Thank you for joining! Your unique code is: ${code}`);
            }

            // Show success message
            document.getElementById('successMessage').classList.remove('hidden');
            document.getElementById('errorMessage').classList.add('hidden');

            // Optionally, reset the form
            document.getElementById('registrationForm').reset();
        });