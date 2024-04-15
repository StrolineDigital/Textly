//This constant stores the install button element
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// This event listener listens for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Show the install button
    butInstall.style.display = 'block';
    });


// This event listener listens for the click event on the install button
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Hide the install button
    butInstall.style.display = 'none';
    // Log the result of the prompt
    console.log(`User response to the install prompt: ${outcome}`);
    }
);

// This event listener listens for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the installation of the app
    console.log('Awesome! Textly has been installed', event);
    }
);
