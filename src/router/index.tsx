import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import Protected from '../components/Protected';
import SignIn from '../pages/Authentication/SignIn';

const Tables = lazy(() => import('../pages/Tables'));
const DefaultLayout = lazy(() => import('../components/layout/DefaultLayout'));
const TableEditCategory = lazy(() => import('../components/TableEditCategory'));
const TableAddCategory = lazy(() => import('../components/TableAddCategory'));

const router = createBrowserRouter([
    {
        errorElement: <div>error</div>,
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/faq-category" />
            },
            {
                path: '/faq-category',
                element: <Protected>
                    <Tables />
                </Protected>,
            },
            {
                path: '/faq-category-edit',
                element: <Protected>
                    <TableEditCategory />
                </Protected>,
            },
            {
                path: '/faq-category-add',
                element: <Protected>
                    <TableAddCategory />
                </Protected>,
            },
        ]
    },
    {
        path: "/auth/signin",
        element: <SignIn />,
    },

])
export default router