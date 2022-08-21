import { FC } from "react";
import { Header } from "@/component/Header";
import "./index.less";
import { Footer } from "@/component/Footer";



export const Home: FC = () => {

    return (
        <div className="home-main">
            <div id="home" className="home-item home-warp">
                <div>
                    <div>/但行好事</div>
                    <div>莫问前程/</div>
                </div>
            </div>
            <div id="about" className="home-item about-warp">
                <h4>关于我</h4>
            </div>
            <div id="works" className="home-item works-warp">
                <h4>作品集锦</h4>
            </div>
            <div id="logs" className="home-item logs-warp">
                <h4>更新日志</h4>
            </div>
            <Footer />
        </div>
    );
}