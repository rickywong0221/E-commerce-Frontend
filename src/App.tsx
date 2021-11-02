import React, {useEffect, useState} from 'react';
import './App.css';
import ProductListingPage from "./ui/page/ProductListingPage";
import {HashRouter, Route, Switch} from "react-router-dom";
import ProductDetailPage from "./ui/page/ProductDetailPage";
import LoginPage from "./ui/page/SignInPage";
import ShoppingCartPage from "./ui/page/ShoppingCartPage";
import AuthService from "./service/AuthService";
import {Spinner} from "react-bootstrap";
import ProtectedRoute from "./ui/component/ProtectedRoute";
import CheckoutPage from "./ui/page/CheckoutPage";
import Footer from "./ui/component/Footer";
import ThankYouPage from "./ui/page/ThankYouPage";

function App() {
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      setFirebaseInitialized(true);
    });
  }, []);

  if (!isFirebaseInitialized) {
    return (
        <div className="App">
          <Spinner animation="border" variant="primary" /> Loading...
        </div>
    )
  }

  return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <ProductListingPage/>
            </Route>

            <Route exact path="/details/:productId/:productName">
              <ProductDetailPage/>
            </Route>

            <Route exact path="/sign-in">
              <LoginPage/>
            </Route>

            <ProtectedRoute path="/cart">
              <ShoppingCartPage/>
            </ProtectedRoute>

            <ProtectedRoute path="/checkout/:transactionId">
              <CheckoutPage/>
            </ProtectedRoute>

            <ProtectedRoute path="/thankyou">
              <ThankYouPage/>
            </ProtectedRoute>
          </Switch>
        </HashRouter>
        <Footer/>
      </div>
  );
}

export default App;