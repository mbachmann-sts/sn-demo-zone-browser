import { Worterbuch } from "worterbuch-react";
import GenericLocationBrowser from "./components/GenericLocationBrowser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <Worterbuch
          automaticReconnect
          config={{
            backendScheme: "ws",
            backendHost: "10.240.1.51",
            backendPort: 31000,
            backendPath: "/ws",
          }}
        >
          <GenericLocationBrowser path="stagenetSolution/locations" />
        </Worterbuch>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
