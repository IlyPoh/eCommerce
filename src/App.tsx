// IMPORTS
// libraries
import { Routes, Route } from 'react-router-dom';

// components
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';
import { ErrorBox } from './components/ErrorBox/ErrorBox';
import { BreadcrumbsLayout } from './components/BreadcrumbsLayout';
import { HeadlineAndPaginationLayout } from './components/HeadlineAndPaginationLayout';

// pages
import { Blog } from './pages/Blog/Blog';
import { Mainpage } from './pages/Mainpage';
import { Article } from './pages/Article/Article';
import { Product } from './pages/Product/Product';
import { Products } from './pages/Products/Products';

// utils
import { useAppSelector, useFetchCategories, useFetchTags } from './hooks';

// styles
import './styles/app.scss';

// COMPONENT
function App(): React.JSX.Element {
  const { error, loading } = useAppSelector(state => state.appState);

  useFetchCategories();
  useFetchTags();

  return (
    <>
      {error && <ErrorBox error={error} />}
      {loading && <Loading />}
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Main page */}
          <Route index element={<Mainpage />} />

          {/* Pages with breadcrumbs */}
          <Route element={<BreadcrumbsLayout />}>
            {/* Pages this Headline and Pagination */}
            <Route element={<HeadlineAndPaginationLayout />}>
              {/* Category */}
              <Route path='/products'>
                <Route path=':category?'>
                  <Route path=':subcategory?' element={<Products />} />
                </Route>
              </Route>

              {/* Blog */}
              <Route path='/blog'>
                <Route path=':category?' element={<Blog />} />
              </Route>
            </Route>

            {/* Product */}
            <Route path='/products/:category/:subcategory'>
              <Route path=':productId' element={<Product />} />
            </Route>

            {/* Article */}
            <Route path='/blog/:category/:articleId' element={<Article />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
