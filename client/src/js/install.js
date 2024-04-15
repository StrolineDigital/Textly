//This constant stores the install button element
const butInstall = document.getElementById('buttonInstall');

//I want to make the install button on the html page able to perform the install event
//This event listener listens for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    //This prevents the default behavior of the event
    event.preventDefault();
    //This stores the event object in the deferredPrompt variable
    window.deferredPrompt = event;
    //This shows the install button
    butInstall.style.display = 'block';
});
//This event listener listens for the click event on the install button
butInstall.addEventListener('click', async () => {
    //This checks if the browser supports the beforeinstallprompt event
    if (window.deferredPrompt) {
        //This triggers the beforeinstallprompt event
        window.deferredPrompt.prompt();
        //This waits for the user to respond to the prompt
        const { outcome } = await window.deferredPrompt.userChoice;
        //This logs the user's response to the console
        console.log(`User response to the install prompt: ${outcome}`);
        //This checks if the user accepted the prompt
        if (outcome === 'accepted') {
            //This hides the install button
            butInstall.style.display = 'none';
        }
        //This clears the deferredPrompt variable
        window.deferredPrompt = null;
    }

});
//This event listener listens for the appinstalled event
window.addEventListener('appinstalled', () => {
    //This logs a message to the console
    console.log('App was installed');
});

// I want to there to be a notification in the browser when the user is offline
//This event listener listens for the offline event
window.addEventListener('offline', () => {
    //This creates a notification
    new Notification('You are offline');
});

