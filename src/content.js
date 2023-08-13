const URLS_TO_REMOVE = "https://www.linkedin.com/feed";
const DEFAULT_URL_TO_CLICK = "https://www.linkedin.com/jobs/";

function removeAnchorWithUrlReference(url) {
  const hyperlinks = document.querySelectorAll("a");
  var anchor_present = false;

  hyperlinks.forEach((hyperlink) => {
    // Check if the anchor's URL reference matches the target URL reference
    if (hyperlink.href && hyperlink.href.startsWith(url)) {
      // Remove the anchor from the DOM
      hyperlink.remove();
      anchor_present = true;
    }
  });

  return anchor_present;
}

function clickAnchorWithUrlReference(url) {
    const anchors = document.querySelectorAll("a");
    for (const anchor of anchors) {
      if (anchor.href && anchor.href.startsWith(url)) {
        // Click the first matching link and stop the loop
        anchor.click();
        break; 
      }
    }
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        /* 
          Remove all Social Feed URLs & redirect to jobs page
          only if Social Feed URLs are present on current page
        */
        const anchor_found = removeAnchorWithUrlReference(URLS_TO_REMOVE);
        if(anchor_found) {
          clickAnchorWithUrlReference(DEFAULT_URL_TO_CLICK);
        }
    }
}
