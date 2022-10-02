import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { ColorTool } from "./ColorTool";
import { StringTool } from "./StringTool";
import { Header } from "@/component/Header";
import { Footer } from "@/component/Footer";
import { SideDrawer } from "@/component/SideDrawer";
import "./App.less";



export const App: FC = () => {

    return (
        <>
            <Header />
            {/* 侧边栏（移动端显示） */}
            <SideDrawer />
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/colortool" component={ColorTool} />
                <Route exact path="/stringtool" component={StringTool} />

                <Redirect to={`/home`} />
            </Switch>
            <Footer />
        </>
    );
}