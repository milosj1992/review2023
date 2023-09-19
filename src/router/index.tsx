import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Protected from '../components/Protected';
import SignIn from '../pages/Authentication/SignIn';

const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Tables = lazy(() => import('../pages/Tables'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));
const TableEditCategory = lazy(() => import('../components/TableEditCategory'));
const TableAddCategory = lazy(() => import('../components/TableAddCategory'));

const router = createBrowserRouter([
    {
        errorElement: <div>error</div>,
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element:
                    <Protected>
                        <ECommerce />
                    </Protected>,
            },
            {
                path: '/forms/form-elements',
                element: <Protected>
                    <FormElements />
                </Protected>,
            },
            {
                path: '/forms/form-layout',
                element:
                    <Protected>
                        <FormLayout />
                    </Protected>
                ,
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
            {
                path: '/ui/buttons',
                element: <Protected>
                    <Buttons />
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