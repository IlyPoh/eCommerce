// libraries
import { Route, Routes } from 'react-router-dom';

// components
import { Layout } from './components/Layout/Layout';

// pages
import { Mainpage } from './pages/Mainpage/Mainpage';

// styles
import './styles/app.scss';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
