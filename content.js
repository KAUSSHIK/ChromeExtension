// Function to extract GitHub username from LinkedIn profile
function findGitHubUsername() {
    // This is a placeholder. You'll need to find a way to locate the GitHub link in the LinkedIn profile's HTML structure.
    // Return the username or null if no link is found.
    const githubLink = document.querySelector('a[href*="github.com"]');
    if (githubLink) {
        return githubLink.href.split('/').pop();
    } else {
        return null;
    }
}

// Function to fetch GitHub bio using GitHub API
function fetchGitHubBio(username) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.github.com/users/${username}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resp = JSON.parse(xhr.responseText);
                    resolve(resp.bio || 'No bio available.');
                } else {
                    reject('Error fetching bio.');
                }
            }
        }
        xhr.send();
    });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "fetchGithubBio") {
            const username = findGitHubUsername();
            if (username) {
                fetchGitHubBio(username)
                    .then(bio => sendResponse({bioContent: bio}))
                    .catch(error => sendResponse({bioContent: error}));
                return true;  // Will respond asynchronously.
            } else {
                sendResponse({bioContent: 'GitHub username not found on LinkedIn profile.'});
            }
        }
    }
);
