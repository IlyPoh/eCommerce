// libraries
import { Routes, Route } from 'react-router-dom';

// components
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';
import { ErrorBox } from './components/ErrorBox/ErrorBox';

// pages
import { Product } from './pages/Product/Product';
import { Mainpage } from './pages/Mainpage/Mainpage';
import { Category } from './pages/Category/Category';

// utils
import {
  useAppSelector,
  useFetchCategories,
  useFetchTags,
} from './utils/hooks';

// styles
import './styles/app.scss';

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
          <Route index element={<Mainpage />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:subcategory" element={<Category />} />
          <Route path="/product/:product" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
