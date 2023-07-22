// libraries
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';
import { ErrorBox } from './components/ErrorBox/ErrorBox';

// pages
import { Product } from './pages/Product/Product';
import { Mainpage } from './pages/Mainpage/Mainpage';
import { Category } from './pages/Category/Category';

// store
import { setTags } from './store/Slices/tagsSlice';
import { setLoading } from './store/Slices/appSlice';
import { setReviews } from './store/Slices/reviewSlice';
import { setCategories } from './store/Slices/categorySlice';
import {
  useGetCategoriesQuery,
  useGetReviewsQuery,
  useGetTagsQuery,
} from './store/API/api';

// types
import { IError } from './types';

// utils
import { errorHandler } from './utils/helpers';
import { useAppDispatch, useAppSelector } from './utils/hooks';

// styles
import './styles/app.scss';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.appState);

  const categoryQuery = useGetCategoriesQuery();
  const tagsQuery = useGetTagsQuery();
  const reviewQuery = useGetReviewsQuery();

  useEffect(() => {
    if (categoryQuery.error) {
      errorHandler(categoryQuery.error as IError, dispatch);
    } else if (tagsQuery.error) {
      errorHandler(tagsQuery.error as IError, dispatch);
    } else if (reviewQuery.error) {
      errorHandler(reviewQuery.error as IError, dispatch);
    }

    if (
      categoryQuery.isLoading ||
      tagsQuery.isLoading ||
      reviewQuery.isLoading
    ) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (tagsQuery.data) dispatch(setTags(tagsQuery.data));
    if (reviewQuery.data) dispatch(setReviews(reviewQuery.data));
    if (categoryQuery.data) dispatch(setCategories(categoryQuery.data));
  }, [categoryQuery, tagsQuery, reviewQuery, dispatch]);

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
