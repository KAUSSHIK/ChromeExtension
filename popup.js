document.addEventListener('DOMContentLoaded', function() {
    var fetchBioButton = document.getElementById('fetchBioButton');
    fetchBioButton.addEventListener('click', function() {

        // Send a message to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "fetchGithubBio"}, function(response) {
                if (response) {
                    // Update the popup's content
                    var githubBioDiv = document.getElementById('githubBio');
                    githubBioDiv.innerHTML = response.bioContent || "No bio found.";
                }
            });
        });

    }, false);
}, false);
