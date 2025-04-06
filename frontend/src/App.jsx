import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";

import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute";
import PostDetails from "./pages/PostDetails";
import CategoryPage from "./pages/CategoryPage";
import EditPost from "./pages/EditPost";
import ScrollToTop from "./components/shared/ScrollToTop";
import NirvanKand from "./pages/NirvanKand";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/nirvankand" element={<NirvanKand />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<EditPost />} />
        </Route>

        <Route path="/post/:postSlug" element={<PostDetails />} />

        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
      
      <ScrollToTop />
      <Footer />

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
