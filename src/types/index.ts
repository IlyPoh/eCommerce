export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  classes?: string;
}

export interface ILink {
  text: string;
  link: string;
}

export interface IApiUrls {
  products: string;
  categories: string;
  tags: string;
  reviews: string;
  news: string;
}

export interface IHeaderLinks {
  chatWithUs: ILink;
  phone: ILink;
  email: ILink;
  blog: ILink;
  aboutUs: ILink;
  careers: ILink;
}

export interface IFooterLink {
  title: string;
  links: ILink[];
}

export interface IError {
  message?: string;
  status?: number;
}
