import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import Loader from './components/Loader';

const App = () => {

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )

}

export default App;
