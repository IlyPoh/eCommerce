// libraries
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';
import { ErrorBox } from './components/ErrorBox/ErrorBox';

// pages
import { Mainpage } from './pages/Mainpage/Mainpage';
import { Category } from './pages/Category/Category';

// store
import { RootState } from './store';
import { setTags } from './store/Slices/tagsSlice';
import { setLoading } from './store/Slices/appSlice';
import { setCategories } from './store/Slices/categorySlice';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetTagsQuery,
} from './store/API/api';

// types
import { IError } from './types';

// utils
import { errorHandler } from './utils/helpers';

// styles
import './styles/app.scss';

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  const categoryQuery = useGetCategoriesQuery();
  const tagsQuery = useGetTagsQuery();
  const productsQuery = useGetProductsQuery();
  const { error, loading } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    if (categoryQuery.error) {
      errorHandler(categoryQuery.error as IError, dispatch);
    } else if (tagsQuery.error) {
      errorHandler(tagsQuery.error as IError, dispatch);
    } else if (productsQuery.error) {
      errorHandler(productsQuery.error as IError, dispatch);
    }
  }, [categoryQuery, tagsQuery, productsQuery, dispatch]);

  useEffect(() => {
    if (
      categoryQuery.isLoading ||
      tagsQuery.isLoading ||
      productsQuery.isLoading
    ) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [categoryQuery, tagsQuery, productsQuery, dispatch]);

  useEffect(() => {
    dispatch(setTags(tagsQuery.data));
    dispatch(setCategories(categoryQuery.data));
  }, [tagsQuery, categoryQuery, dispatch]);

  return (
    <>
      {error && <ErrorBox error={error} />}
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:subcategory" element={<Category />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
