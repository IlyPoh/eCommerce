import {
  IStoreApiUrls,
  IHeaderLinks,
  IFooterLink,
  ILink,
  ILinkWithYear,
  ICheckboxData,
  EFilter,
  ICheckboxDataWithSelector,
  IItemsPerPage,
} from '@/types';
export const env = import.meta.env;

export const MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ITEMS_PER_PAGE: IItemsPerPage = {
  products: 9,
  news: 11,
  mainpageNews: 5,
};

// apis
export const STORE_API_URL = env.VITE_URL;

export const STORE_API_ENDPOINTS: IStoreApiUrls = {
  categories: env.VITE_ENDPOINT_CATEGORIES,
  products: env.VITE_ENDPOINT_PRODUCTS,
  productTags: env.VITE_ENDPOINT_PRODUCT_TAGS,
  reviews: env.VITE_ENDPOINT_REVIEWS,
  news: env.VITE_ENDPOINT_NEWS,
  newsCategories: env.VITE_ENDPOINT_NEWS_CATEGORIES,
  brands: env.VITE_ENDPOINT_BRANDS,
  total: env.VITE_ENDPOINT_TOTAL,
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

export const BLOG_LINKS_MONTHS: ILinkWithYear[] = [
  {
    text: 'July 2023',
    link: '/blog',
    year: {
      year: 2023,
      month: 7,
    },
  },
  {
    text: 'June 2023',
    link: '/blog',
    year: {
      year: 2023,
      month: 6,
    },
  },
  {
    text: 'May 2023',
    link: '/blog',
    year: {
      year: 2023,
      month: 5,
    },
  },
  {
    text: 'April 2023',
    link: '/blog',
    year: {
      year: 2023,
      month: 4,
    },
  },
  {
    text: 'March 2023',
    link: '/blog',
    year: {
      year: 2023,
      month: 3,
    },
  },
];

// Product checkbox data
export const FIRST_CHECKBOX_DATA: ICheckboxData = {
  value: EFilter.CLOTHING,
  count: 13,
};

export const SECOND_CHECKBOX_DATA: ICheckboxData = {
  value: EFilter.KIDS,
  count: 4,
};

export const THIRD_CHECKBOX_DATA: ICheckboxDataWithSelector = {
  value: EFilter.UKRAINE,
  count: 6,
  selector: {
    Ukraine: 6,
    UK: 5,
    Germany: 3,
    France: 4,
    Spain: 2,
    Italy: 0,
  },
};

// other
export const COPYRIGHT = 'Copyright © 2020 petrbilek.com';
