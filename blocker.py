from mitmproxy import http
from datetime import datetime
import requests

# Note that the sites will NOT be blocket BETWEEN start and end
CONSTRAINTS = {
    "https://www.instagram.com": {
        "start": 15,
        "end": 22
    },
    "https://www.instagram.com/": {
        "start": 15,
        "end": 22
    },
    "https://www.youtube.com/shorts/": {
        "start": 0,
        "end": 0
    },
    "https://www.instagram.com/explore/": {
        "start": 0,
        "end": 0
    },
    "https://www.instagram.com/reels/": {
        "start": 0,
        "end": 0
    },
    "https://www.reddit.com": {
        "start": 15,
        "end": 22
    }
}


def should_redirect(url: str, current_hour: int) -> bool:
    for site, hours in CONSTRAINTS.items():
        is_prefix_match = url.startswith(site)  # and site != "www.reddit.com"
        # is_domain_match = site in url and site == "www.reddit.com"

        if is_prefix_match:  # or is_domain_match:
            if not (hours["start"] <= current_hour < hours["end"]):
                return True
    return False


def request(flow: http.HTTPFlow) -> None:
    current_hour = datetime.now().hour
    url = flow.request.pretty_url

    if not should_redirect(url, current_hour):
        return

    flow.response = http.Response.make(302, b"", {"Location": "https://www.google.com"})
