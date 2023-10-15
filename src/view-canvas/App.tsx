import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Wuziqi } from "./Wuziqi";
import "./App.less";



export const App: FC = () => {

    return (
        <>
            <Switch>
                <Route exact path="/wuziqi" component={Wuziqi} />

                <Redirect to={`/wuziqi`} />
            </Switch>
        </>
    );
}