import { ILink } from '../types';

// apis
export const API_URLS: Record<string, string> = {
  products: 'https://fakestoreapi.com/products/',
  categories: 'https://fakestoreapi.com/products/categories',
  category: 'https://fakestoreapi.com/products/category/',
  users: 'https://fakestoreapi.com/users/',
  news: 'https://jsonplaceholder.typicode.com/posts/',
};

// links
export const HEADER_LINKS: Record<string, ILink> = {
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
