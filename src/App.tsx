import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import Loader from './components/Loader';
/**
 * 
 * @returns "@testing-library/jest-dom": "^6.1.3",
  "@testing-library/react": "^14.0.0",
  "@testing-library/user-event": "^13.5.0",
  "@types/jest": "^29.5.5",
  "@types/testing-library__jest-dom": "^6.0.0",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "ts-jest": "^29.1.1",
  "ts-node": "^10.9.1",
  "typescript": "^5.0.2"
  "identity-obj-proxy": "^3.0.0",

 */
const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
