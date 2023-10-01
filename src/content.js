const URL_TO_REMOVE = "https://www.linkedin.com/feed";
const DEFAULT_URL_TO_CLICK = "https://www.linkedin.com/jobs/";

function disableAnchorWithUrlReference(url, disable, redirect_url) {
  const hyperlinks = document.querySelectorAll("a");
  hyperlinks.forEach((hyperlink) => {
    // Check if the anchor's URL reference matches the target URL reference
    if (hyperlink.href && hyperlink.href.startsWith(url)) {
      // Remove/add the anchor based on the flag
      if(disable) {
        hyperlink.style.display = "none";
      }
      else {
        hyperlink.style.display = "flex";
      }
    }
  });

  /*
    Redirect to provided redirect_url if current page starts
    with url to be removed
  */
  if(disable && document.URL.startsWith(url)) {
    clickAnchorWithUrlReference(redirect_url);
  }
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
        disableAnchorWithUrlReference(URL_TO_REMOVE, true, DEFAULT_URL_TO_CLICK);
    }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.enabled === false) {
    disableAnchorWithUrlReference(URL_TO_REMOVE, false, null);
  } else {
    disableAnchorWithUrlReference(URL_TO_REMOVE, true, DEFAULT_URL_TO_CLICK);
  }
});
