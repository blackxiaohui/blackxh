import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Header } from "@/component/Header";
import { SideDrawer } from "@/component/SideDrawer";
import "./App.less";



export const App: FC = () => {

    return (
        <>
            <Header />
            <SideDrawer />

            <Switch>
                <Route exact path="/home" component={Home} />
                <Redirect to={`/home`} />
            </Switch>
        </>
    );
}