export const firstLettertoUppercase = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const getBlogLink = (category: string | undefined): string => {
  return category ? `/blog/${category}` : `/blog`;
};

export const getProductsLink = (
  category: string | undefined,
  subcategory: string | undefined
): string => {
  if (category && subcategory) {
    return `/products/${category}/${subcategory}`;
  } else if (category) {
    return `/products/${category}`;
  } else {
    return `/products`;
  }
};

export const errorCodeChecker = (code: number | undefined): string => {
  const errorMessages: { [key: number]: string } = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    500: 'Internal server error',
  };

  const defaultMessage = 'Unknown error';

  return code !== undefined && errorMessages[code] !== undefined
    ? `${code} - ${errorMessages[code]}`
    : defaultMessage;
};

export const formatDate = (inputDate: string): string => {
  const dateObj = new Date(inputDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};
