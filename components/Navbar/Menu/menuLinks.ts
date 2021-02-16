export interface ILink {
  name: string;
  href: string;
}

export interface IMenuLink {
  name: string;
  links?: ILink[];
  isLink?: boolean;
  href?: string;
}

export const contactUsLink = "https://uw.co.uk/help/contact-us";

export const menuLinks: IMenuLink[] = [
  {
    name: "About",
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
    ],
  },
  {
    name: "Services",
    links: [
      {
        name: "All our services",
        href: "https://uw.co.uk/services",
      },
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
        href: "https://uw.co.uk/services/more-ways-to-save",
      },
    ],
  },
  {
    name: "Help",
    links: [
      {
        name: "Our coronavirus response",
        href: "https://uw.co.uk/help/our-response-to-the-coronavirus",
      },
      {
        name: "Help centre",
        href: "https://help.uw.co.uk",
      },
      {
        name: "Contact us",
        href: contactUsLink,
      },
    ],
  },
  {
    name: "Earn with us",
    isLink: true,
    href: "https://uw.co.uk/partner",
  },
];

export const shortMenuLinks: IMenuLink[] = [
  {
    name: "Help",
    isLink: true,
    href: "https://help.uw.co.uk/category/billing_and_payments",
  },
  {
    name: "Contact us",
    isLink: true,
    href: "https://uw.co.uk/help/contact-us",
  },
];
