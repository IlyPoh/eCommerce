// IMPORTS
import process from 'process';
import { loadEnv } from 'vite';
import jsonServer from 'json-server';

// CONSTANTS
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('db/db.json');
const env = loadEnv(process.env.NODE_ENV, process.cwd());
const port = env.VITE_SERVER_PORT ? parseInt(env.VITE_SERVER_PORT) : 3333;

// APPLY MIDDLEWARES TO SERVER
server.use(middlewares);

// FILTERS
// general filters
const filterById = (items, id) => {
  return id ? items.filter(item => item.id == id) : items;
};

const filterByCategory = (items, category) => {
  return category ? items.filter(item => item.category == category) : items;
};

const filterByTags = (items, tags) => {
  if (!tags) return items;
  tags = tags ? tags.split(',') : [];
  return items.filter(items => tags.every(tag => items.tags.includes(tag)));
};

const filterByLimit = (items, limit) => {
  return limit ? items.slice(0, limit) : items;
};

const filterByPage = (items, limit, page) => {
  if (!limit || !page) return items;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedNews = items.slice(startIndex, endIndex);

  return paginatedNews;
};

// PRODUCT FILTERS
const filterByName = (products, name) => {
  return name
    ? products.filter(product =>
        product.name.toLowerCase().includes(name.toLowerCase())
      )
    : products;
};

const filterBySubcategory = (products, subcategory) => {
  return subcategory
    ? products.filter(product => product.subcategory == subcategory)
    : products;
};

const filterByBrands = (products, brands) => {
  if (!brands) return products;
  brands = brands.split(',');
  return products.filter(product => brands.includes(product.brand));
};

const filterByCountry = (products, country) => {
  return country
    ? products.filter(
        product => product.country.toLowerCase() === country.toLowerCase()
      )
    : products;
};

const filterByPriceRange = (products, minPrice, maxPrice) => {
  if (!minPrice && !maxPrice) {
    return products;
  }

  return products.filter(product => {
    const finalPrice = product.discount
      ? product.discount.final_price
      : product.price;
    return (
      (!minPrice || finalPrice >= parseFloat(minPrice)) &&
      (!maxPrice || finalPrice <= parseFloat(maxPrice))
    );
  });
};

const filterByRatings = (products, ratings) => {
  if (!ratings) return products;
  const ratingsArray = ratings.split(',').map(rating => parseInt(rating));
  return products.filter(product =>
    ratingsArray.some(
      rating => product.rating >= rating && product.rating < rating + 1
    )
  );
};

const filterBySort = (products, sort) => {
  if (!sort) return products;
  if (sort === 'popular') return products.sort((a, b) => b.rating - a.rating);
  if (sort === 'cheapest') return products.sort((a, b) => a.price - b.price);
};

// NEWS FILTERS
const filterByDateRange = (news, gte, lte) => {
  if (gte && lte) {
    return news.filter(
      item =>
        new Date(item.publishedAt) >= new Date(gte) &&
        new Date(item.publishedAt) <= new Date(lte)
    );
  } else if (gte) {
    return news.filter(item => new Date(item.publishedAt) >= new Date(gte));
  } else if (lte) {
    return news.filter(item => new Date(item.publishedAt) <= new Date(lte));
  } else {
    return news;
  }
};

// SERVER ROUTES
server.get(env.VITE_ENDPOINT_PRODUCTS, (req, res) => {
  let filteredProducts = router.db.get('products').value();

  const {
    id,
    name,
    category,
    subcategory,
    country,
    brands,
    tags,
    ratings,
    sort,
    limit,
    page,
    minPrice,
    maxPrice,
  } = req.query;

  filteredProducts = filterById(filteredProducts, id);
  filteredProducts = filterByName(filteredProducts, name);
  filteredProducts = filterByCategory(filteredProducts, category);
  filteredProducts = filterBySubcategory(filteredProducts, subcategory);
  filteredProducts = filterByCountry(filteredProducts, country);
  filteredProducts = filterByBrands(filteredProducts, brands);
  filteredProducts = filterByTags(filteredProducts, tags);
  filteredProducts = filterByPriceRange(filteredProducts, minPrice, maxPrice);
  filteredProducts = filterByRatings(filteredProducts, ratings);
  filteredProducts = filterBySort(filteredProducts, sort);

  const pageCount = Math.ceil(filteredProducts.length / parseInt(limit));

  filteredProducts = filterByPage(
    filteredProducts,
    parseInt(limit),
    parseInt(page)
  );

  res.json({ productsData: filteredProducts, totalPages: pageCount });
});

server.get(env.VITE_ENDPOINT_NEWS, (req, res) => {
  let filteredNews = router.db.get('news').value();

  const { id, category, limit, page, tags, gte, lte } = req.query;

  filteredNews = filterById(filteredNews, id);
  filteredNews = filterByDateRange(filteredNews, gte, lte);
  filteredNews = filterByTags(filteredNews, tags);
  filteredNews = filterByCategory(filteredNews, category);

  const pageCount = Math.ceil(filteredNews.length / parseInt(limit));

  filteredNews = page
    ? filterByPage(filteredNews, parseInt(limit), page)
    : filterByLimit(filteredNews, parseInt(limit));

  res.json({ newsData: filteredNews, totalPages: pageCount });
});

// USE DEFAULT ROUTER
server.use(router);

// START SERVER
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
