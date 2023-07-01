// libraries
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

// components
import { ErrorBox } from './components/ErrorBox/ErrorBox';
import { Layout } from './components/Layout/Layout';
import { Loading } from './components/Loading/Loading';

// pages
import { Mainpage } from './pages/Mainpage/Mainpage';
import { Category } from './pages/Category/Category';

// store
import { RootState } from './store';
import { fetchCategories } from './store/Slices/categorySlice';

// styles
import './styles/app.scss';
import { fetchTags } from './store/Slices/tagsSlice';

function App(): React.JSX.Element {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();

  const { error, loading } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

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
