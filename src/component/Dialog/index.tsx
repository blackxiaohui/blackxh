import { FC } from "react";
import "./index.less";



export const Dialog: FC = (props) => {

    const { children } = props;

    return (
        <div className="dialog-main">
            <div className="dialog-mask"></div>
            <div className="dialog-content">{children}</div>
        </div>
    );
}