/**
 * AMBALA WORKER - GITHUB PRIVATE REPO DATABASE CONNECTOR
 * Uses GitHub REST API v3 to read and commit data into a private GitHub repository.
 */

(function () {
  'use strict';

  const GITHUB_CONFIG_KEY = 'ambala_github_db_config';

  const DEFAULT_CONFIG = {
    owner: 'an420kit',
    repo: 'ambala-worker',
    branch: 'main',
    token: ''
  };

  // Get current GitHub Database config
  function getGitHubConfig() {
    try {
      const cfg = localStorage.getItem(GITHUB_CONFIG_KEY);
      if (cfg) {
        const parsed = JSON.parse(cfg);
        if (parsed.owner === 'ank420kit') parsed.owner = 'an420kit';
        if (parsed.repo === 'aambala-worker') parsed.repo = 'ambala-worker';
        if (!parsed.token) parsed.token = DEFAULT_CONFIG.token;
        return parsed;
      }
      localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  // Save GitHub Database config
  function saveGitHubConfig(owner, repo, token, branch = 'main') {
    const cleanRepo = (repo || '').trim().replace(/\s+/g, '-');
    const cfg = {
      owner: (owner || '').trim(),
      repo: cleanRepo,
      branch: (branch || '').trim() || 'main',
      token: (token || '').trim(),
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(cfg));
    return cfg;
  }

  // Get Auth Header (supports both Classic and Fine-Grained github_pat tokens)
  function getAuthHeader(token) {
    return token.startsWith('github_pat_') ? `Bearer ${token}` : `token ${token}`;
  }

  // Test connection to the private repo
  async function testConnection() {
    const cfg = getGitHubConfig();
    if (!cfg || !cfg.token || !cfg.owner || !cfg.repo) {
      return { success: false, message: 'कॉन्फ़िगरेशन अधूरा है (Username, Repo या Token गायब है)।' };
    }

    try {
      const res = await fetch(`https://api.github.com/repos/${cfg.owner}/${cfg.repo}`, {
        headers: {
          'Authorization': getAuthHeader(cfg.token),
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const repoData = await res.json();
        return {
          success: true,
          message: `सफलतापूर्वक कनेक्ट हो गया! रेपो: ${repoData.full_name} (${repoData.private ? '🔒 Private' : 'Public'})`,
          repoData
        };
      } else {
        const err = await res.json().catch(() => ({}));
        if (res.status === 404) {
          return {
            success: false,
            message: `रेपो '${cfg.owner}/${cfg.repo}' GitHub पर नहीं मिली। कृपया github.com/new पर जाकर '${cfg.repo}' नाम की प्राइवेट रेपो बना लें।`
          };
        }
        return { success: false, message: `कनेक्शन विफल (${res.status}): ${err.message || 'अमान्य टोकन या रेपो'}` };
      }
    } catch (e) {
      return { success: false, message: `नेटवर्क त्रुटि: ${e.message}` };
    }
  }

  // Fetch JSON file from the private repo
  async function fetchJSONFile(path) {
    const cfg = getGitHubConfig();
    if (!cfg || !cfg.token) {
      try {
        const localRes = await fetch(path);
        return await localRes.json();
      } catch (e) {
        return null;
      }
    }

    try {
      const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}?ref=${cfg.branch}`;
      const res = await fetch(url, {
        headers: {
          'Authorization': getAuthHeader(cfg.token),
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const fileData = await res.json();
        const content = atob(fileData.content);
        return {
          sha: fileData.sha,
          data: JSON.parse(decodeURIComponent(escape(content)))
        };
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  // Commit updated JSON back to the private repo
  async function commitJSONFile(path, jsonData, commitMessage = 'Update database via Ambala Worker App') {
    const cfg = getGitHubConfig();
    if (!cfg || !cfg.token) {
      return { success: false, message: 'GitHub टोकन सेट नहीं है।' };
    }

    try {
      let currentSha = null;
      const getUrl = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}?ref=${cfg.branch}`;
      const getRes = await fetch(getUrl, {
        headers: {
          'Authorization': getAuthHeader(cfg.token),
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        currentSha = fileInfo.sha;
      }

      const contentStr = JSON.stringify(jsonData, null, 2);
      const contentBase64 = btoa(unescape(encodeURIComponent(contentStr)));

      const putBody = {
        message: commitMessage,
        content: contentBase64,
        branch: cfg.branch
      };
      if (currentSha) {
        putBody.sha = currentSha;
      }

      const putRes = await fetch(`https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': getAuthHeader(cfg.token),
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putBody)
      });

      if (putRes.ok) {
        const commitData = await putRes.json();
        return {
          success: true,
          message: `${path} GitHub रेपो में सुरक्षित सेव हो गया!`,
          commitSha: commitData.commit.sha
        };
      } else {
        const err = await putRes.json().catch(() => ({}));
        return { success: false, message: `सेव विफल (${path}): ${err.message || 'त्रुटि'}` };
      }
    } catch (e) {
      return { success: false, message: `अपडेट त्रुटि (${path}): ${e.message}` };
    }
  }

  // Push all 7 data files to GitHub repo data/ folder
  async function pushAllData() {
    const cfg = getGitHubConfig();
    if (!cfg || !cfg.token) {
      return { success: false, message: 'GitHub टोकन सेट नहीं है।' };
    }

    const filesToSync = [
      { path: 'data/workers.json', getData: () => window.AMBALA_DATA?.getStoredWorkers?.() || [] },
      { path: 'data/pending_workers.json', getData: () => window.AMBALA_DATA?.getPendingWorkers?.() || [] },
      { path: 'data/rejected_workers.json', getData: () => window.AMBALA_DATA?.getRejectedWorkers?.() || [] },
      { path: 'data/customers.json', getData: () => window.AMBALA_DATA?.getStoredCustomers?.() || [] },
      { path: 'data/jobs.json', getData: () => window.AMBALA_DATA?.getStoredJobs?.() || [] },
      { path: 'data/categories.json', getData: () => window.AMBALA_DATA?.getStoredCategories?.() || [] },
      { path: 'data/localities.json', getData: () => window.AMBALA_DATA?.getStoredLocalities?.() || [] }
    ];

    const results = [];
    for (const item of filesToSync) {
      try {
        let contentToPush = item.getData();
        if (!contentToPush || (Array.isArray(contentToPush) && contentToPush.length === 0)) {
          // If empty locally, check if local file has content
          try {
            const res = await fetch(item.path);
            if (res.ok) {
              const fileContent = await res.json();
              if (Array.isArray(fileContent) && fileContent.length > 0) contentToPush = fileContent;
            }
          } catch (e) {}
        }
        if (!contentToPush) contentToPush = [];

        const commitRes = await commitJSONFile(item.path, contentToPush, `Sync ${item.path} database from Ambala Admin`);
        results.push({ path: item.path, ...commitRes });
      } catch (err) {
        results.push({ path: item.path, success: false, message: err.message });
      }
    }

    const allSuccess = results.every(r => r.success);
    return {
      success: allSuccess,
      results,
      message: allSuccess 
        ? `सभी 7 डेटाबेस फाइल्स (data/*) GitHub Repo में सफलतापूर्वक सिंक हो गईं!` 
        : `कुछ फाइल्स सिंक नहीं हो पाईं: ${results.filter(r => !r.success).map(r => r.path).join(', ')}`
    };
  }

  // Pull all data files from GitHub repo
  async function pullAllData() {
    const cfg = getGitHubConfig();
    if (!cfg || !cfg.token) {
      return { success: false, message: 'GitHub टोकन सेट नहीं है।' };
    }

    try {
      const workersFile = await fetchJSONFile('data/workers.json');
      const pendingFile = await fetchJSONFile('data/pending_workers.json');
      const rejectedFile = await fetchJSONFile('data/rejected_workers.json');
      const customersFile = await fetchJSONFile('data/customers.json');
      const jobsFile = await fetchJSONFile('data/jobs.json');
      const localitiesFile = await fetchJSONFile('data/localities.json');
      const categoriesFile = await fetchJSONFile('data/categories.json');

      if (workersFile && workersFile.data) localStorage.setItem('ambala_workers', JSON.stringify(workersFile.data));
      if (pendingFile && pendingFile.data) localStorage.setItem('ambala_pending_workers', JSON.stringify(pendingFile.data));
      if (rejectedFile && rejectedFile.data) localStorage.setItem('ambala_rejected_workers', JSON.stringify(rejectedFile.data));
      if (customersFile && customersFile.data) localStorage.setItem('ambala_customers', JSON.stringify(customersFile.data));
      if (jobsFile && jobsFile.data) localStorage.setItem('ambala_jobs', JSON.stringify(jobsFile.data));
      if (localitiesFile && localitiesFile.data) localStorage.setItem('ambala_master_localities', JSON.stringify(localitiesFile.data));
      if (categoriesFile && categoriesFile.data) localStorage.setItem('ambala_master_categories', JSON.stringify(categoriesFile.data));

      return {
        success: true,
        message: 'GitHub से सभी 7 डेटाबेस फाइल्स लोड हो गईं!'
      };
    } catch (e) {
      return { success: false, message: `डेटा फेच त्रुटि: ${e.message}` };
    }
  }

  // Expose to window
  window.AMBALA_GITHUB_DB = {
    getConfig: getGitHubConfig,
    saveConfig: saveGitHubConfig,
    testConnection: testConnection,
    fetchJSONFile: fetchJSONFile,
    commitJSONFile: commitJSONFile,
    pushAllData: pushAllData,
    pullAllData: pullAllData
  };

})();

