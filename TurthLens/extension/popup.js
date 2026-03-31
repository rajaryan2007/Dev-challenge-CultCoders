document.addEventListener('DOMContentLoaded', () => {
  loadLocalHistory();
});

const baseUrl = 'https://dev-challenge-cult-coders.vercel.app'; // Production endpoint

document.getElementById('analyze-btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString().trim()
  }, async (results) => {
    const selectedText = results[0]?.result;
    
    if (!selectedText || selectedText.length < 5) {
      document.getElementById('status').innerText = 'Selection too short. Highlight more text to analyze.';
      document.getElementById('status').style.color = '#f38ba8';
      return;
    }

    const analyzeBtn = document.getElementById('analyze-btn');
    const loading = document.getElementById('loading');
    const status = document.getElementById('status');
    const resultDiv = document.getElementById('result');

    analyzeBtn.disabled = true;
    loading.style.display = 'block';
    status.innerText = 'Triggering TruthLens Neural Core...';
    status.style.color = '#7f849c';
    if (resultDiv.style.display === 'block') resultDiv.style.opacity = '0.4';

    const startTime = Date.now();

    try {
      const response = await fetch(`${baseUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: selectedText })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Identity verification failed. Please log in to TruthLens.');
      }

      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        status.innerText = `Extracting truth vectors... [ATTEMPT ${attempts}/30]`;

        try {
          const historyRes = await fetch(`${baseUrl}/api/history`, {
            credentials: 'include'
          });

          if (!historyRes.ok) return;

          const historyData = await historyRes.json();
          
          const latest = historyData.find(item => {
            const itemTime = new Date(item.createdAt).getTime();
            const timeDiff = Math.abs(itemTime - startTime);
            
            const dbInput = (item.input || "").trim().substring(0, 30);
            const selInput = selectedText.substring(0, 30);
            
            return timeDiff < 120000 && dbInput === selInput;
          });

          if (latest) {
            clearInterval(poll);
            saveToLocalHistory(selectedText, latest.result, latest.createdAt);
            showResult(latest);
            status.innerText = 'Neural extraction complete.';
            status.style.color = '#a6e3a1';
          }

          if (attempts >= 30) {
            clearInterval(poll);
            status.innerText = 'Sync timeout. Please check the Dashboard for your results.';
            status.style.color = '#fab387';
            analyzeBtn.disabled = false;
            loading.style.display = 'none';
          }
        } catch (pollErr) {
          console.error("Poller error:", pollErr);
        }
      }, 3000);

    } catch (error) {
      status.innerText = error.message;
      status.style.color = '#f38ba8';
      analyzeBtn.disabled = false;
      loading.style.display = 'none';
    }
  });
});

function showResult(data) {
  const result = data.result;
  const analysisDiv = document.getElementById('result');
  const analyzeBtn = document.getElementById('analyze-btn');
  const loading = document.getElementById('loading');

  loading.style.display = 'none';
  analyzeBtn.style.display = 'none';
  analysisDiv.style.display = 'block';
  analysisDiv.style.opacity = '1';

  const scoreVal = document.getElementById('score-val');
  const scoreIndicator = document.getElementById('score-indicator');
  const score = result.manipulation_score || 0;
  
  scoreVal.innerText = `${score}%`;
  
  if (score > 70) {
    scoreVal.style.color = '#f38ba8';
    scoreIndicator.style.background = '#f38ba8';
  } else if (score > 30) {
    scoreVal.style.color = '#fab387';
    scoreIndicator.style.background = '#fab387';
  } else {
    scoreVal.style.color = '#a6e3a1';
    scoreIndicator.style.background = '#a6e3a1';
  }

  const biasLabel = document.getElementById('bias-val');
  const direction = result.bias?.direction?.toUpperCase() || 'NEUTRAL';
  biasLabel.innerText = `${direction} BIAS DETECTED`;
  document.getElementById('summary-val').innerText = result.bias?.explanation || "No clear bias vector identified.";

  const updateEmo = (id, val) => {
    const pct = Math.round((val || 0) * 100);
    const fill = document.getElementById(`${id}-fill`);
    const label = document.getElementById(`${id}-pct`);
    if (fill && label) {
      fill.style.width = `${pct}%`;
      label.innerText = `${pct}%`;
    }
  };

  updateEmo('fear', result.emotions?.fear);
  updateEmo('anger', result.emotions?.anger);
  updateEmo('hope', result.emotions?.hope);
  updateEmo('sadness', result.emotions?.sadness);

  document.getElementById('rewrite-val').innerText = result.rewrite || "Failed to reconstruct original context.";
}

function saveToLocalHistory(input, result, createdAt) {
  chrome.storage.local.get({ history: [] }, (data) => {
    const history = data.history;
    if (history.length > 0 && history[0].input === input) return;
    
    history.unshift({ input, result, createdAt });
    chrome.storage.local.set({ history: history.slice(0, 10) }, () => {
      loadLocalHistory();
    });
  });
}

function loadLocalHistory() {
  chrome.storage.local.get({ history: [] }, (data) => {
    const history = data.history;
    const historySection = document.getElementById('history-section');
    const historyList = document.getElementById('history-list');

    if (history.length > 0) {
      historySection.style.display = 'block';
      historyList.innerHTML = '';
      history.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="history-score">${item.result.manipulation_score}% SCORE</span>
            <span style="font-size: 8px; color: #585b70; font-weight: 800;">${new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="history-text">"${item.input}"</div>
        `;
        div.onclick = () => showResult(item);
        historyList.appendChild(div);
      });
    }
  });
}
