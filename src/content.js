// URL reference to target (change this to the URL you want to match)
const URLS_TO_REMOVE = "https://www.linkedin.com/feed";
const DEFAULT_URL_TO_CLICK = "https://www.linkedin.com/jobs/";

function removeAnchorWithUrlReference(url) {
  const hyperlinks = document.querySelectorAll("a");
  hyperlinks.forEach((hyperlink) => {
    // Check if the button's URL reference matches the target URL reference
    if (hyperlink.href && hyperlink.href.startsWith(url)) {
      // Remove the button from the DOM
      hyperlink.remove();
    }
  });
}

function clickAnchorWithUrlReference(url) {
    const anchors = document.querySelectorAll("a");
    for (const anchor of anchors) {
      if (anchor.href.startsWith(url)) {
        anchor.click();
        break; // Click the first matching link and stop the loop.
      }
    }
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        removeAnchorWithUrlReference(URLS_TO_REMOVE);
        clickAnchorWithUrlReference(DEFAULT_URL_TO_CLICK);
    }
}
