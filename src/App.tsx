// IMPORTS
// libraries
import { Routes, Route } from 'react-router-dom';

// components
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';
import { ErrorBox } from './components/ErrorBox/ErrorBox';

// pages
import { Blog } from './pages/Blog/Blog';
import { Mainpage } from './pages/Mainpage';
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
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:subcategory" element={<Category />} />

          {/* Product */}
          <Route path="/product/:product" element={<Product />} />

          {/* Blog */}
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/:page" element={<Blog />} />
          <Route path="/blog/:year/:month" element={<Blog />} />
          <Route path="/blog/:year/:month/:page" element={<Blog />} />
          <Route path="/blog/category" element={<Blog />} />
          <Route path="/blog/category/:tag" element={<Blog />} />
          <Route path="/blog/category/:tag/:page" element={<Blog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
