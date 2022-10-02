import { FC } from "react";
import { aboutList } from "@/conf/about";
import "./index.less";



export const AboutUs: FC = () => {

    return (
        <div className="about-box">
            <h3>关于我</h3>
            <div className="about-list">
                {
                    aboutList.map(about => {
                        return <div className="about-item">{about.content}</div>
                    })
                }
            </div>
        </div>
    );
}