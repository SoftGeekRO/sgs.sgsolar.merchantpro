// loader.js - Strict ordered loading with static injection

let debugMode = false;
const CDN_BASE = __PUBLIC_PATH__,
  // 1. Get reference to the loader script element
  loaderScript = document.currentScript || document.querySelector('script[src*="loader.js"]'),
  // 2. Embedded manifest from Webpack
  manifest = __ASSET_MANIFEST__;

// Debug logger with Unicode icons
function debugLog(...messages) {
  if (debugMode) {
    console.log('🛠️ [SGS Loader]', ...messages);
  }
}

// Error logger with Unicode icon
function errorLog(...messages) {
  console.error('❌ [SGS Loader]', ...messages);
}

// Success logger with Unicode icon
function successLog(...messages) {
  if (debugMode) {
    console.log('✅ [SGS Loader]', ...messages);
  }
}

// Ensure all paths use CDN
function ensureCDNPath(path) {
  if (path.startsWith('http')) {
    return path;
  }
  return CDN_BASE + path.replace(/^\//, '');
}

// Function to append timestamp if needed
function appendTimestamp(url) {
  const urlParams = new URLSearchParams(window.location.search);
  const shouldAddTimestamp = urlParams.get('_') === 'true';

  if (shouldAddTimestamp) {
    debugMode = true;
    const timestamp = new Date().getTime();
    const separator = url.includes('?') ? '&' : '?';
    return url + separator + 'ts=' + timestamp;
  }
  return url;
}

function sortAssets(a, b) {
  if (a.name.includes('vendor')) { return -1; }
  if (b.name.includes('vendor')) { return 1; }
  if (a.name.includes('main')) { return 1; }
  if (b.name.includes('main')) { return -1; }
  return 0;
}

(async () => {

  if (!loaderScript) {
    console.error('Loader script not found in DOM');
    return;
  }

  // 2. Get parent node and next sibling for precise insertion
  const parentNode = loaderScript.parentNode,
        nextSibling = loaderScript.nextSibling;

  // Convert manifest to array and add CDN base
  const manifestEntries = Object.entries(manifest)
    .map(([name, path]) => ({
      name,
      path: ensureCDNPath(path)
    }))
    .filter(entry => entry.path.endsWith('.js'));

  // 4. Sort files using your custom function
  const sortedFiles = manifestEntries.sort(sortAssets);

  // 5. Create script element with version preservation
  function createScriptElement(src, onload, reject) {
    // add timestamp when debug is true '_=true'
    src = appendTimestamp(src, onload);

    const script = document.createElement('script');
    script.src = src;
    script.async = false; // Critical for execution order
    onload?.() && (script.onload = (e) => onload);
    script.onerror = () => {
      errorLog('Failed to load script:', src);
      reject?.() && reject();
    };

    return script;
  }

  try {
    // Create a document fragment for batch insertion
    const fragment = document.createDocumentFragment();

    for (const file of sortedFiles) {
      fragment.appendChild(createScriptElement(file.path));
      debugLog(`➡️ Injecting: ${file.name}`, `\n   📂 Path: ${file.path}`);

    }

    // Insert fragment immediately after loader script
    parentNode.insertBefore(fragment, nextSibling);

    successLog(`Successfully injected ${sortedFiles.length} files`);
  } catch (e) {
    errorLog('File injection failed:', e);
  }

})();
