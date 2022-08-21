import { FC } from "react";
import menuHeaderGray from "@/assets/image/menu_header_gray.png";
import "./index.less";



export const SideDrawer: FC = () => {

    const goAnchor = (selector: string) => {
        document.querySelector(selector)?.scrollIntoView({
            behavior: "smooth"
        })
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
            <div className="menu-box" onClick={onMenuClick}>
                <img className="menu-btn" src={menuHeaderGray} alt="菜单" />
            </div>
            <div className="link-box">
                <div className="link-item" onClick={() => goAnchor("#home")}>首页</div>
                <div className="link-item" onClick={() => goAnchor("#about")}>关于</div>
                <div className="link-item" onClick={() => goAnchor("#works")}>作品</div>
                <div className="link-item" onClick={() => goAnchor("#logs")}>日志</div>
            </div>
        </div>
    );
}