import { FC, useEffect } from "react";
import { GetColorTool } from "./components/GetColorTool";
import { ConvertColorTool } from "./components/ConvertColorTool";
import "./index.less";



export const ColorTool: FC = () => {

    useEffect(() => {

        // 通过url的参数定位到指定位置

        window.scrollTo(0, 0);

    }, []);

    return (
        <div className="color-tool-main">
            <div className="content">
                <GetColorTool />
                <ConvertColorTool />
            </div>
            {/* <div className="title">
                颜色工具
            </div>
            <div className="sub-title">
                紧张施工中，敬请期待
            </div> */}
        </div>
    );
}