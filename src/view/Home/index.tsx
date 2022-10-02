import { FC } from "react";
import { Footer } from "@/component/Footer";
import { Works } from "./components/Works";
import { AboutUs } from "./components/AboutUs";
import { Logs } from "./components/Logs";
import "./index.less";



export const Home: FC = () => {

    return (
        <div className="home-main">
            <div id="home" className="home-item home-warp">
                <div className="title">
                    <div className="title-first">/ 但行好事</div>
                    <div className="title-last">莫问前程 /</div>
                </div>
                <div className="sub-title">--- 欢迎来到布莱克小辉的个人主页 ---</div>
            </div>
            <div id="about" className="home-item about-warp">
                <AboutUs />
            </div>
            <div id="works" className="home-item works-warp">
                <Works />
            </div>
            <div id="logs" className="home-item logs-warp">
                <Logs />
            </div>
        </div>
    );
}