import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root, { rootAction } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: rootAction,
  },
]);

export function App() {
  return (
    <div className="bg-background min-h-screen flex container justify-center items-center font-sans antialiased">
      <RouterProvider router={router} />
    </div>
  );
}
