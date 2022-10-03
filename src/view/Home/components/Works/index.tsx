import { FC } from "react";
import { useHistory } from "react-router-dom";
import { worksList } from "@/conf/works";
import itemBg from "@/assets/image/home_bg.png"
import "./index.less";

export const Works: FC = () => {

    const history = useHistory();

    return (
        <div className="works-box">
            <h3>作品集锦</h3>
            <div className="work-list">
                {worksList.map(work => {
                    return (
                        <div className="work-item"
                            key={work.id}
                            onClick={() => {
                                history.push(work.link);
                            }}>
                            <img className="pic" src={itemBg}></img>
                            <div className="title-box">
                                <div className="title">{work.title}</div>
                                <div className="sub-title">{work.subTitle}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}