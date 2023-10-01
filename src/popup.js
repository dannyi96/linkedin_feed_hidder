document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('switch');

    chrome.storage.sync.get('enabled', function (data) {
        toggleSwitch.checked = data.enabled === undefined ? true : data.enabled;
    });

    toggleSwitch.addEventListener('change', function () {
        const isEnabled = toggleSwitch.checked;
        chrome.storage.sync.set({ 'enabled': isEnabled });
        
        // Send a message to content scripts to update their behavior
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { enabled: isEnabled });
        });
    });

});