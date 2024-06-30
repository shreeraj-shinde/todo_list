import Navbar from "../components/ui/Navbar";

const Layout =
  (Component: any) =>
  ({ ...props }) => {
    return (
      <main>
        <Navbar />
        <Component {...props} />
      </main>
    );
  };

export default Layout;
