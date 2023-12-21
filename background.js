// Listener for messages from content scripts or popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // Check for a specific action
      if (request.action === "fetchGithubData") {
        // Perform the GitHub API request
        fetchGitHubData(request.username)
          .then(data => sendResponse({data: data}))
          .catch(error => sendResponse({error: error}));
  
        return true; // Indicates an asynchronous response.
      }
    }
  );
  
  // Function to fetch data from GitHub's API
  function fetchGitHubData(username) {
    return new Promise((resolve, reject) => {
      // Make an XHR or Fetch request to GitHub's API
      fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  