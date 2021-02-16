export enum FooterLinkCategory {
  Legal = "legal",
  About = "about",
  HelpAndSupport = "helpAndSupport",
  InvestorRelations = "investorRelations",
  OurServices = "ourServices",
  DownloadApp = "downloadApp",
  UWPartners = "uwPartners",
}

export const mobileLinkSections = [
  [
    FooterLinkCategory.Legal,
    FooterLinkCategory.InvestorRelations,
    FooterLinkCategory.OurServices,
    FooterLinkCategory.DownloadApp,
  ],
  [
    FooterLinkCategory.About,
    FooterLinkCategory.HelpAndSupport,
    FooterLinkCategory.UWPartners,
  ],
];

export const desktopLinkSections = [
  [
    FooterLinkCategory.Legal,
    FooterLinkCategory.InvestorRelations,
    FooterLinkCategory.UWPartners,
  ],
  [FooterLinkCategory.About, FooterLinkCategory.OurServices],
  [FooterLinkCategory.HelpAndSupport, FooterLinkCategory.DownloadApp],
];

interface ILink {
  name: string;
  href: string;
}

export interface ISection {
  category: string;
  links: ILink[];
}

export interface IFooterLinks {
  [section: string]: ISection;
}

export const footerLinks: IFooterLinks = {
  [FooterLinkCategory.Legal]: {
    category: "Legal",
    links: [
      {
        name: "Terms and conditions",
        href: "https://uw.co.uk/legal/terms-conditions",
      },
      {
        name: "Tariffs and charges",
        href: "https://uw.co.uk/legal/tariffs-charges",
      },
      {
        name: "Codes of practice",
        href: "https://uw.co.uk/legal/codes-of-practice",
      },
      {
        name: "Cookies policy",
        href: "https://uw.co.uk/legal/cookies-policy",
      },
      {
        name: "Customers privacy",
        href: "https://uw.co.uk/legal/privacy-customer",
      },
      {
        name: "Partners privacy",
        href: "https://uw.co.uk/legal/privacy-partner",
      },
      {
        name: "Energy information",
        href: "https://uw.co.uk/legal/energy-information",
      },
    ],
  },
  [FooterLinkCategory.About]: {
    category: "About",
    links: [
      {
        name: "About us",
        href: "https://uw.co.uk/about-us",
      },
      {
        name: "Careers",
        href: "https://uw.co.uk/about-us/careers",
      },
      {
        name: "Media",
        href: "https://uw.co.uk/about-us/media",
      },
      {
        name: "Our awards",
        href: "https://uw.co.uk/about-us/our-awards",
      },
      {
        name: "Which?",
        href: "https://uw.co.uk/about-us/which",
      },
      {
        name: "Our green initiatives",
        href: "https://uw.co.uk/about-us/our-green-initiatives",
      },
      {
        name: "The UW Foundation",
        href: "https://uw.co.uk/about-us/uw-foundation",
      },
      {
        name: "UW for Business",
        href: "https://uw.co.uk/business",
      },
    ],
  },
  [FooterLinkCategory.HelpAndSupport]: {
    category: "Help and support",
    links: [
      {
        name: "Our coronavirus response",
        href: "https://uw.co.uk/help/our-response-to-the-coronavirus",
      },
      {
        name: "Help centre",
        href: "https://uw.co.uk/help",
      },
      {
        name: "Contact us",
        href: "https://uw.co.uk/help/contact-us",
      },
      {
        name: "Making a complaint",
        href: "https://uw.co.uk/help/making-a-complaint",
      },
      {
        name: "Mobile porting",
        href: "https://uw.co.uk/help/mobile-porting",
      },
      {
        name: "Priority services",
        href: "https://uw.co.uk/help/priority-services-register",
      },
      {
        name: "Help paying your bills",
        href: "https://uw.co.uk/help/paying-bills",
      },
      {
        name: "Register for Clubhouse",
        href: "https://uw.co.uk/clubhouse",
      },
      {
        name: "Submit a meter reading",
        href: "https://uw.co.uk/clubhouse/meterReading/quicklinks",
      },
      {
        name: "Staying safe online",
        href: "https://uw.co.uk/help/staying-safe-online",
      },
    ],
  },
  [FooterLinkCategory.InvestorRelations]: {
    category: "Investor relations",
    links: [
      {
        name: "Visit Telecom Plus",
        href: "https://telecomplus.co.uk/",
      },
      {
        name: "Accessibility",
        href: "https://telecomplus.co.uk/legal/accessibility",
      },
      {
        name: "Corporate information",
        href: "https://telecomplus.co.uk/legal/corporate-information",
      },
    ],
  },
  [FooterLinkCategory.OurServices]: {
    category: "Our services",
    links: [
      {
        name: "Energy",
        href: "https://uw.co.uk/services/energy",
      },
      {
        name: "Broadband",
        href: "https://uw.co.uk/services/broadband",
      },
      {
        name: "Mobile",
        href: "https://uw.co.uk/services/mobile",
      },
      {
        name: "Insurance",
        href: "https://uw.co.uk/services/insurance",
      },
      {
        name: "More ways to save",
        href: "https://uw.co.uk/more-ways-to-save",
      },
    ],
  },
  [FooterLinkCategory.DownloadApp]: {
    category: "Download our customer app",
    links: [
      {
        name: "App Store",
        href: "https://apps.apple.com/gb/app/uw-clubhouse/id1087299862",
      },
      {
        name: "Google Play",
        href:
          "https://play.google.com/store/apps/details?id=com.utilitywarehouse.clubhouse&hl=en_GB",
      },
    ],
  },
  [FooterLinkCategory.UWPartners]: {
    category: "UW Partners",
    links: [
      {
        name: "Your Partner portal",
        href: "https://uw.co.uk/partner/portal",
      },
      {
        name: "Earn with us",
        href: "https://uw.co.uk/partner",
      },
      {
        name: "Sign up via Join the Club",
        href: "https://uw.co.uk/join",
      },
      {
        name: "Launch remote presentation",
        href: "https://uw.co.uk/remote",
      },
    ],
  },
};
