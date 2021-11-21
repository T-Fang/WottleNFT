declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const pageview = (url: URL) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  params: object;
};
// log specific events happening.
export const event = ({ action, params }: GTagEvent): void => {
  window.gtag("event", action, params);
};
