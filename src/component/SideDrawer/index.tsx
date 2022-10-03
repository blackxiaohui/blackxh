import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { meunList } from "@/conf/header";
import menuHeader from "@/assets/image/menu_header.png";
import "./index.less";



export const SideDrawer: FC = () => {

    const location = useLocation();
    const history = useHistory();

    const goAnchor = (selector: string) => {
        document.querySelector(selector)?.scrollIntoView({
            behavior: "smooth"
        })
        onMenuClick();
    }

    const goPage = (link: string) => {
        history.push(link);
        onMenuClick();
    }

    const onMenuClick = () => {
        const ele = document.getElementById("side-drawer");
        if (ele) {
            if (ele.style.width === "270px") {
                ele.style.width = "0px";
                ele.style.transition = ".5s";
            } else {
                ele.style.width = "270px";
                ele.style.transition = ".5s";
            }
        }
    }

    return (
        <div id="side-drawer" className="side-drawer">
            <img className="menu-box" onClick={onMenuClick} src={menuHeader} alt="菜单" />
            <div className="link-box">
                {
                    location.pathname === "/home"
                        ? <>
                            <div className="link-item" onClick={() => goAnchor("#home")}>首页</div>
                            <div className="link-item" onClick={() => goAnchor("#about")}>关于</div>
                            <div className="link-item" onClick={() => goAnchor("#works")}>作品</div>
                            <div className="link-item" onClick={() => goAnchor("#logs")}>日志</div>
                        </>
                        : <>
                            {
                                meunList.map(item => {
                                    return <div key={item.title} className="link-item" onClick={() => goPage(item.link)}>{item.title}</div>
                                })
                            }
                        </>
                }
            </div>
        </div>
    );
}