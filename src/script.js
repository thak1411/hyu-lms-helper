/**
 * Inject Script
 */
window.onload = function() {
    function injectScript(file_path, tag) {
        var node = document.getElementsByTagName(tag)[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file_path);
        node.appendChild(script);
    }
    injectScript(chrome.runtime.getURL('/src/content.js'), 'body');
}