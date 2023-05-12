import { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";

//layout
const MainLayout = lazy(() => import("../layout/mainLayout"));
const AdminLayout = lazy(() => import("../layout/adminLayout"));

//Pages
const Store = lazy(() => import("../pages/Store"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/authentication/login"));
const Register = lazy(() => import("../pages/authentication/register"));
const AdUser = lazy(() => import("@/pages/Admin/AdUser"));
const AdBooks = lazy(() => import("@/pages/Admin/AdBook"));

// Guard
const Guards = lazy(() => import("@/guards/adminGuard"));

const routes = [
  {
    path: "",
    layout: MainLayout,
    element: Home,
  },
  {
    path: "store",
    layout: MainLayout,
    element: Store,
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
    path: "admin",
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
