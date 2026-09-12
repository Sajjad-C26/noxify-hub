document.addEventListener("DOMContentLoaded", function () {
    fetch('matches.json')
        .then(response => response.json())
        .then(data => {
            // Check if liveChannels exists
            let channels = data.liveChannels || [];
            if (channels.length === 0) return;

            // Create container HTML
            let containerHtml = `
                <div class="toffee-channels-container">
                    <div class="toffee-channels-title">🔥 Live TV Channels</div>
                    <div class="toffee-slider">
            `;

            channels.forEach(channel => {
                containerHtml += `
                    <div class="toffee-card" onclick="window.location.href='player.html?url=${encodeURIComponent(channel.streamUrl)}'">
                        <div class="toffee-logo-wrapper">
                            <img src="${channel.logo}" alt="${channel.name}" onerror="this.src='https://i.imgur.com/dVRMHM4.png'">
                        </div>
                        <span class="toffee-name">${channel.name}</span>
                    </div>
                `;
            });

            containerHtml += `
                    </div>
                </div>
            `;

            // Insert into page safely without touching index.html structure
            let targetElement = document.querySelector('.liveMatches') || document.querySelector('main') || document.body;
            let injectionDiv = document.createElement('div');
            injectionDiv.innerHTML = containerHtml;
            targetElement.prepend(injectionDiv);
        })
        .catch(err => console.error("Error loading Toffee channels:", err));
});
