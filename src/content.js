const URL_TO_REMOVE = "https://www.linkedin.com/feed";
const DEFAULT_URL_TO_CLICK = "https://www.linkedin.com/jobs/";

function removeAnchorWithUrlReference(url) {
  const hyperlinks = document.querySelectorAll("a");

  hyperlinks.forEach((hyperlink) => {
    // Check if the anchor's URL reference matches the target URL reference
    if (hyperlink.href && hyperlink.href.startsWith(url)) {
      // Remove the anchor from the DOM
      hyperlink.remove();
    }
  });
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
          Remove all anchors with Feed URL
          & redirect to jobs page if present on feed page
        */
        removeAnchorWithUrlReference(URL_TO_REMOVE);
        if(document.URL.startsWith(URL_TO_REMOVE)) {
          clickAnchorWithUrlReference(DEFAULT_URL_TO_CLICK);
        }
    }
}
