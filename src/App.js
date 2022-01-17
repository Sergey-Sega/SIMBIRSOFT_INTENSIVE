import React, { lazy, Suspense } from "react";
import { Header } from "../src/app/components/Header";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Registration = lazy(()=> import("./app/components/pages/Registration"))
const Root = lazy(()=>import("./app/components/pages/MainPage/MainPage"))
const StartExchangePage = lazy(()=> import("./app/components/pages/StartExchangePage"))


const App = () => {

  return (
    <div className="App">
     <BrowserRouter>
     <Suspense fallback={null}>              
     <Header />                                 
       <Switch>
    <Route exact path="/Registration" component={Registration}/> 
    <Route exact path="/" component={Root}/> 
    <Route exact path="/StartExchangePage" component={StartExchangePage}/>
       </Switch>
    </Suspense>
    </BrowserRouter>
    </div>
  );
};

export default App;

// В дальнейшем в <Suspense fallback={null}>  заместо null, будет компонент Loader