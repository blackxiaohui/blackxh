import { FC, useEffect } from "react";
import "./index.less";



export const StringTool: FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="string-tool-main">
            <div className="title">
                字符串工具
            </div>
            <div className="sub-title">
                紧张施工中，敬请期待
            </div>
        </div>
    );
}