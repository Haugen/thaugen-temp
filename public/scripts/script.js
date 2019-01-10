'use strict';

(function() {
  const latestCommit = {};

  fetch('https://api.github.com/users/Haugen/events')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'PushEvent' && data[i].actor.login === 'Haugen') {
          const commit = data[i].payload.commits[0];
          latestCommit.message = commit.message;
          latestCommit.apiUrl = commit.url;
          latestCommit.createdAt = data[i].created_at.split('T')[0];
          break;
        }
      }

      return;
    })
    .then(() => {
      fetch(latestCommit.apiUrl)
        .then(response => response.json())
        .then(data => {
          latestCommit.url = data.html_url;
          const dateElement = document.getElementById('latest-commit-date');
          const messageElement = document.getElementById(
            'latest-commit-message'
          );

          dateElement.innerHTML = latestCommit.createdAt + ' - ';
          messageElement.innerHTML = latestCommit.message;
          messageElement.setAttribute('href', latestCommit.url);
        });
    });
})();
