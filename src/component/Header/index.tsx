import { FC, useEffect, useState } from "react";
import logoHeader from "@/assets/image/logo_header.png";
import menuHeader from "@/assets/image/menu_header.png";
import "./index.less";



export const Header: FC = () => {

    const [isFixed, setIsFixed] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    const handleScroll = (e: any) => {
        // console.log(
        //     e.srcElement.scrollingElement.scrollTop, // 距离滚动条顶部高度
        //     e.srcElement.scrollingElement.scrollHeight, // 整个文档高度
        // )
        setIsFixed(!!(e.srcElement.scrollingElement.scrollTop > 500));
    }

    const goAnchor = (selector: string) => {
        document.querySelector(selector)?.scrollIntoView({
            behavior: "smooth"
        })
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
        <div className={`header ${isFixed ? "header-fixed" : ""}`}>
            <div className="logo-box">
                <img className="logo" src={logoHeader} alt="布莱克小辉" />
            </div>
            <div className="link-box">
                <span className="link-item" onClick={() => goAnchor("#home")}>首页</span>
                <span className="link-item" onClick={() => goAnchor("#about")}>关于</span>
                <span className="link-item" onClick={() => goAnchor("#works")}>作品</span>
                <span className="link-item" onClick={() => goAnchor("#logs")}>日志</span>
            </div>
            <div className="menu-box" onClick={onMenuClick}>
                <img className="menu-btn" src={menuHeader} alt="菜单" />
            </div>
        </div >
    );
}