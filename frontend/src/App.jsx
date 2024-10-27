import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./components/common/ErrorPage";

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
