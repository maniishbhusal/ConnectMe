import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout"

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>
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
