import { IStoreApiUrls, IHeaderLinks, IFooterLink, ILink } from '../types';

// apis
export const STORE_API_URL = 'http://localhost:3001/';

export const STORE_API_ENDPOINTS: IStoreApiUrls = {
  categories: 'categories',
  products: 'products',
  tags: 'tags',
  reviews: 'reviews',
  news: 'news',
};

export const NEWS_API_URL = 'https://newsapi.org/v2/everything';
export const NEWS_API_KEY: string = import.meta.env.VITE_NEWS_API_KEY;

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
// sidebar links
export const FIRST_SIDEBAR_LINKS: ILink[] = [
  {
    text: 'Kitchen',
    link: '/kitchen',
  },
  {
    text: 'Meat and Fish',
    link: '/meat_and_fish',
  },
  {
    text: 'Special nutrition',
    link: '/special_nutrition',
  },
  {
    text: 'Pharmacy',
    link: '/pharmacy',
  },
  {
    text: 'Baby',
    link: '/baby',
  },
];

export const SECOND_SIDEBAR_LINKS: ILink[] = [
  {
    text: 'Carrots',
    link: '/carrots',
  },
  {
    text: 'Tomatoes',
    link: '/tomatoes',
  },
  {
    text: 'Potatoes',
    link: '/potatoes',
  },
  {
    text: 'Chicken',
    link: '/chicken',
  },
  {
    text: 'Pork',
    link: '/pork',
  },
];

export const BLOG_LINKS_MONTHS: ILink[] = [
  {
    text: 'July 2023',
    link: '/blog/2023/7',
  },
  {
    text: 'June 2023',
    link: '/blog/2023/6',
  },
  {
    text: 'May 2023',
    link: '/blog/2023/5',
  },
  {
    text: 'April 2023',
    link: '/blog/2023/4',
  },
  {
    text: 'March 2023',
    link: '/blog/2023/3',
  },
];

export const BLOG_LINKS_CATEGORIES: ILink[] = [
  {
    text: 'AI',
    link: '/blog/category/ai',
  },
  {
    text: 'Ukraine',
    link: '/blog/category/Ukraine',
  },
  {
    text: 'News',
    link: '/blog/category/news',
  },
  {
    text: 'Politics',
    link: '/blog/category/politics',
  },
  {
    text: 'Business',
    link: '/blog/category/business',
  },
];

// other
export const COPYRIGHT = 'Copyright © 2020 petrbilek.com';
