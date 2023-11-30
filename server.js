// imports
import process from 'process';
import { loadEnv } from 'vite';
import jsonServer from 'json-server';

// constants
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('db/db.json');
const env = loadEnv(process.env.NODE_ENV, process.cwd());
const port = env.VITE_SERVER_PORT ? parseInt(env.VITE_SERVER_PORT) : 3333;

// apply middlewares to server
server.use(middlewares);

// filters
// general filters
const filterById = (items, id) => {
  return id ? items.filter((item) => item.id == id) : items;
};

const filterByCategory = (items, category_id) => {
  return category_id
    ? items.filter((item) => item.category_id == category_id)
    : items;
};

const filterByTags = (items, tags) => {
  if (!tags) return items;
  tags = tags ? tags.split(',') : [];
  return items.filter((items) => tags.every((tag) => items.tags.includes(tag)));
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

// product filters
const filterByName = (products, name) => {
  return name
    ? products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      )
    : products;
};

const filterBySubcategory = (products, subcategory_id) => {
  return subcategory_id
    ? products.filter((product) => product.subcategory_id == subcategory_id)
    : products;
};

const filterByCountry = (products, country) => {
  return country
    ? products.filter(
        (product) => product.country.toLowerCase() === country.toLowerCase()
      )
    : products;
};

const filterByPriceRange = (products, minPrice, maxPrice) => {
  if (!minPrice && !maxPrice) {
    return products;
  }

  return products.filter((product) => {
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

  const ratingsArray = ratings.split(',').map((rating) => parseInt(rating));
  return products.filter((product) =>
    ratingsArray.some(
      (rating) => product.rating >= rating && product.rating < rating + 1
    )
  );
};

// news filters
const filterByDateRange = (news, gte, lte) => {
  if (gte && lte) {
    return news.filter(
      (item) =>
        new Date(item.publishedAt) >= new Date(gte) &&
        new Date(item.publishedAt) <= new Date(lte)
    );
  } else if (gte) {
    return news.filter((item) => new Date(item.publishedAt) >= new Date(gte));
  } else if (lte) {
    return news.filter((item) => new Date(item.publishedAt) <= new Date(lte));
  } else {
    return news;
  }
};

// Server routes
server.get(env.VITE_ENDPOINT_PRODUCTS, (req, res) => {
  let filteredProducts = router.db.get('products').value();

  const {
    id,
    name,
    category_id,
    subcategory_id,
    country,
    tags,
    minPrice,
    maxPrice,
    ratings,
    limit,
    page,
  } = req.query;

  filteredProducts = filterById(filteredProducts, id);
  filteredProducts = filterByName(filteredProducts, name);
  filteredProducts = filterByCategory(filteredProducts, category_id);
  filteredProducts = filterBySubcategory(filteredProducts, subcategory_id);
  filteredProducts = filterByCountry(filteredProducts, country);
  filteredProducts = filterByTags(filteredProducts, tags);
  filteredProducts = filterByPriceRange(filteredProducts, minPrice, maxPrice);
  filteredProducts = filterByRatings(filteredProducts, ratings);

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

  const { id, limit, page, tags, gte, lte } = req.query;

  filteredNews = filterById(filteredNews, id);
  filteredNews = filterByDateRange(filteredNews, gte, lte);
  filteredNews = filterByTags(filteredNews, tags);

  const pageCount = Math.ceil(filteredNews.length / parseInt(limit));

  filteredNews = page
    ? filterByPage(filteredNews, parseInt(limit), page)
    : filterByLimit(filteredNews, parseInt(limit));

  res.json({ newsData: filteredNews, totalPages: pageCount });
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
