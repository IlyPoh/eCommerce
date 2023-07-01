import { IApiUrls, IHeaderLinks, IFooterLink } from '../types';

// apis
export const API_URLS: IApiUrls = {
  categories: '/db/categories.json',
  products: '/db/products.json',
  tags: '/db/tags.json',
  reviews: '/db/reviews.json',
  news: 'https://jsonplaceholder.typicode.com/posts/',
};

// links
export const HEADER_LINKS: IHeaderLinks = {
  chatWithUs: {
    text: 'Chat with us',
    link: '/chat',
  },
  phone: {
    text: '+420 336 775 664',
    link: 'tel:+420336775664',
  },
  email: {
    text: 'info@freshnesecom.com',
    link: 'mailto:info@freshnesecom.com',
  },
  blog: {
    text: 'Blog',
    link: '/blog',
  },
  aboutUs: {
    text: 'About us',
    link: '/about_us',
  },
  careers: {
    text: 'Careers',
    link: '/careers',
  },
};

const footerFirstColumnLinks = [
  {
    text: 'About us',
    link: '/about_us',
  },
  {
    text: 'Careers',
    link: '/careers',
  },
  {
    text: 'Press Releases',
    link: '/press_releases',
  },
  {
    text: 'Blog',
    link: '/blog',
  },
];

const footerSecondColumnLinks = [
  {
    text: 'Facebook',
    link: 'https://www.facebook.com/',
  },
  {
    text: 'Twitter',
    link: 'https://twitter.com/',
  },
  {
    text: 'Instagram',
    link: 'https://www.instagram.com/',
  },
  {
    text: 'Youtube',
    link: 'https://www.youtube.com/',
  },
  {
    text: 'LinkedIn',
    link: 'https://www.linkedin.com/',
  },
];

const footerThirdColumnLinks = [
  {
    text: 'Become an Affiliate',
    link: '',
  },
  {
    text: 'Advertise your product',
    link: '',
  },
  {
    text: 'Sell on Market',
    link: '',
  },
];

const footerFourthColumnLinks = [
  {
    text: 'Your account',
    link: '',
  },
  {
    text: 'Returns Centre',
    link: '',
  },
  {
    text: '100% purchase protection',
    link: '',
  },
  {
    text: 'Chat with us',
    link: '',
  },
  {
    text: 'Help',
    link: '',
  },
];

export const FOOTER_LINKS: IFooterLink[] = [
  {
    title: 'Get in touch',
    links: footerFirstColumnLinks,
  },
  {
    title: 'Connections',
    links: footerSecondColumnLinks,
  },
  {
    title: 'Earnings',
    links: footerThirdColumnLinks,
  },
  {
    title: 'Account',
    links: footerFourthColumnLinks,
  },
];

// other
export const COPYRIGHT = 'Copyright © 2020 petrbilek.com';