import { FC } from "react";
import "./index.less";


export const OverDialog: FC<{
    isBlack: boolean;
}> = (props) => {

    const { isBlack } = props;

    const handleRestart = () => {
        window.location.reload();
    }

    return (
        <div className="dialog-box">
            <div className="dialog-title">提示</div>
            <div className="dialog-des">恭喜{isBlack ? '黑' : '白'}棋获胜</div>
            <div className="dialog-btn-wrap">
                <div className="dialog-btn-restart" onClick={handleRestart}>重新开始</div>
            </div>
        </div>
    );
}