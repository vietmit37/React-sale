import { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";

//layout
const MainLayout = lazy(() => import("../layout/mainLayout"));
const AdminLayout = lazy(() => import("../layout/adminLayout"));

//Pages
const Store = lazy(() => import("@/pages/Store"));
const BookDetail = lazy(() => import("@/pages/BookDetail"));
const DetailOrder = lazy(() => import("@/pages/DetailOrder"));
const History = lazy(() => import("@/pages/history"));
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/authentication/login"));
const Register = lazy(() => import("@/pages/authentication/register"));
const AdUser = lazy(() => import("@/pages/Admin/AdUser"));
const AdBooks = lazy(() => import("@/pages/Admin/AdBook"));
const AdOrder = lazy(() => import("@/pages/Admin/AdOrder"));
const Dashboard = lazy(() => import("@/pages/Admin/Dashboard"));

// Guard
const Guards = lazy(() => import("@/guards/adminGuard"));

const routes = [
  // {
  //   path: "",
  //   layout: MainLayout,
  //   element: Home,
  // },
  {
    path: "",
    layout: MainLayout,
    element: Store,
  },
  {
    path: "book/:slug",
    layout: MainLayout,
    element: BookDetail,
  },
  {
    path: "order",
    layout: MainLayout,
    guard: Guards,
    element: DetailOrder,
  },
  {
    path: "history",
    layout: MainLayout,
    guard: Guards,
    element: History,
  },
  {
    path: "*",
    element: () => <NotFound />,
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "register",
    element: Register,
  },
  {
    path: "admin/user",
    layout: AdminLayout,
    guard: Guards,
    element: AdUser,
  },
  {
    path: "admin/books",
    layout: AdminLayout,
    guard: Guards,
    element: AdBooks,
  },
  {
    path: "admin/order",
    layout: AdminLayout,
    guard: Guards,
    element: AdOrder,
  },
  {
    path: "admins",
    layout: AdminLayout,
    guard: Guards,
    element: Dashboard,
  },
];

function RouteMain() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((routeItem, index) => {
            let { path, element, layout, guard } = routeItem;
            const Component = element;
            const Layout = layout || Fragment;
            const Guard = guard || Fragment;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Guard>
                    <Layout>
                      <Component />
                    </Layout>
                  </Guard>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default RouteMain;
