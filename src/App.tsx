// IMPORTS
// libraries
import { Routes, Route } from 'react-router-dom';

// components
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';
import { ErrorBox } from './components/ErrorBox/ErrorBox';
import { LayoutWithHeadline } from './components/LayoutWithHeadline';
import { BreadcrumbsAndPaginationLayout } from './components/BreadcrumbsAndPaginationLayout';

// pages
import { Blog } from './pages/Blog/Blog';
import { Mainpage } from './pages/Mainpage';
import { Article } from './pages/Article/Article';
import { Product } from './pages/Product/Product';
import { Category } from './pages/Category/Category';

// utils
import {
  useAppSelector,
  useFetchCategories,
  useFetchTags,
} from './utils/hooks';

// styles
import './styles/app.scss';

// COMPONENT
function App(): React.JSX.Element {
  const { error, loading } = useAppSelector((state) => state.appState);

  useFetchCategories();
  useFetchTags();

  return (
    <>
      {error && <ErrorBox error={error} />}
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main page */}
          <Route index element={<Mainpage />} />

          {/* Category */}
          <Route path="/:category/:subcategory?" element={<Category />} />

          {/* Product */}
          <Route path="/product/:product" element={<Product />} />

          {/* Pages with breadcrumbs */}
          <Route element={<BreadcrumbsAndPaginationLayout />}>
            <Route element={<LayoutWithHeadline />}>
              {/* Blog */}
              <Route path="/blog">
                <Route path=":category?" element={<Blog />} />
              </Route>
            </Route>

            {/* Article */}
            <Route path="blog/article/:articleId" element={<Article />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
