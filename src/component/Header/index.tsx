import { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { meunList } from "@/conf/header";
import logoHeader from "@/assets/image/logo_header.png";
import textLogoHeader from "@/assets/image/text_logo_header.png";
import textLogoHeaderWhite from "@/assets/image/text_logo_header_white.png";
import menuHeader from "@/assets/image/menu_header.png";
import menuHeaderWhite from "@/assets/image/menu_header_white.png";
import "./index.less";



export const Header: FC = () => {

    const location = useLocation();
    const history = useHistory();

    const [isFixed, setIsFixed] = useState<boolean>(false);

    useEffect(() => {
        // 非首页默认使用固定的吸顶状态
        if (location.pathname !== "/home") {
            setIsFixed(true);
        }
        // 首页默认使用非吸顶状态（透明的固定在页顶）
        else {
            setIsFixed(false);
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const handleScroll = (e: any) => {
        // console.log(
        //     e.srcElement.scrollingElement.scrollTop, // 距离滚动条顶部高度
        //     e.srcElement.scrollingElement.scrollHeight, // 整个文档高度
        // )
        if (location.pathname === "/home") {
            setIsFixed(!!(e.srcElement.scrollingElement.scrollTop > 80));
        }
    }

    const goAnchor = (selector: string) => {
        document.querySelector(selector)?.scrollIntoView({
            behavior: "smooth"
        })
    }

    const goPage = (link: string) => {
        history.push(link);
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
                <img className="text-logo" src={isFixed ? textLogoHeader : textLogoHeaderWhite} alt="布莱克小辉" />
            </div>
            <div className="link-box">
                {/* 区分页面显示不同的顶栏元素 */}
                {
                    location.pathname === "/home"
                        ? <>
                            <span className="link-item" onClick={() => goAnchor("#home")}>首页</span>
                            <span className="link-item" onClick={() => goAnchor("#about")}>关于</span>
                            <span className="link-item" onClick={() => goAnchor("#works")}>作品</span>
                            <span className="link-item" onClick={() => goAnchor("#logs")}>日志</span>
                        </>
                        : <>
                            {
                                meunList.map(item => {
                                    return <span key={item.title} className="link-item" onClick={() => goPage(item.link)}>{item.title}</span>
                                })
                            }
                        </>
                }
            </div>
            {/* 竖屏时的菜单按钮 */}
            <img className="menu-box" onClick={onMenuClick} src={isFixed ? menuHeader : menuHeaderWhite} alt="菜单" />
        </div >
    );
}