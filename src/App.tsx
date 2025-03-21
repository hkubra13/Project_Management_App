import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Header";
import HomePage from "./Pages/HomePage";
import FeaturesPage from "./Pages/FeaturesPage";
import SolutionsPage from "./Pages/SolutionsPage";
import PlansPage from "./Pages/PlansPage";
import SupportPage from "./Pages/SupportPage";
import SignInModal from "./Modals/SignInModal";
import SignUpModal from "./Modals/SignUpModal";
import Footer from "./Footer";
import Dashboard from "./AppPages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthProvider";

function App() {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const location = useLocation();

  const [userId, setUserId] = useState<number | null>(
    localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null
  );

  useEffect(() => {
    console.log("User ID from localStorage:", userId);
  }, [userId]);

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <AuthProvider>
      {!isDashboardPage && (
        <Header
          openSignInModal={() => setSignInModalOpen(true)}
          openSignUpModal={() => setSignUpModalOpen(true)}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/support" element={<SupportPage />} />


        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard userId={userId} />} />
        </Route>
      </Routes>

      <SignInModal
        currentUser={(id) => {
          setUserId(id);
          if (id !== null) {
            localStorage.setItem("userId", id.toString());
          }
        }}
        show={isSignInModalOpen}
        handleClose={() => setSignInModalOpen(false)}
      />
      <SignUpModal show={isSignUpModalOpen} handleClose={() => setSignUpModalOpen(false)} />

      {!isDashboardPage && <Footer />}
    </AuthProvider>
  );
}

export default App;
