import { FC, useEffect, useState } from "react";
import { Dialog } from "@/component/Dialog"
import { OverDialog } from "./component/OverDialog"
import { checkAll } from './checkTools';

// 全局操作上下文
let globalCtx: CanvasRenderingContext2D;
// 使用一个二维数组，索引作为棋子的坐标
let pieces: any = []
// 初始化二维数组
for (let i = 0; i < 15; i++) {
    pieces.push(new Array(15).fill(''));
}

export const Wuziqi: FC = () => {

    // 当前是否为黑棋
    const [isBlackRound, setIsBlackRound] = useState<boolean>(true);
    // 定义一个变量是否结束游戏
    const [endGame, setEndGame] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const canvas = document.getElementById('el-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        // 设置canvas容器宽高，注意不推荐使用css设置宽高
        canvas.width = 800;
        canvas.height = 800;

        // 自适应屏幕
        const screenWidth = document.documentElement.clientWidth;
        if (screenWidth < 800) {
            const ratio = screenWidth / canvas.width;
            const pianyi = (canvas.width - screenWidth) / 2 / ratio;
            canvas.style["transform"] = `scale(${ratio}) translate(-${pianyi}px,-${pianyi}px)`
        }

        // 设置背景色、位置等
        canvas.style["display"] = "block"
        canvas.style["margin"] = "0 auto"
        canvas.style["background"] = "#0a0"

        // 获取画笔
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        globalCtx = ctx;

        for (let i = 1; i <= 15; i++) {
            // 绘制横线
            ctx.moveTo(50, 50 * i);
            ctx.lineTo(750, 50 * i);
            ctx.stroke();

            // 绘制纵线
            ctx.moveTo(50 * i, 50);
            ctx.lineTo(50 * i, 750);
            ctx.stroke();
        }
    }, []);

    const drawPiece = (x: number, y: number) => {
        if (Number.isNaN(x) || Number.isNaN(y)) return;

        const ctx = globalCtx;
        const tx = isBlackRound ? x - 10 : x + 10;
        const ty = isBlackRound ? y - 10 : y + 10;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        const g = ctx.createRadialGradient(tx, ty, 0, tx, ty, 30);
        g.addColorStop(0, isBlackRound ? "#ccc" : "#666");
        g.addColorStop(1, isBlackRound ? "#000" : "#fff");
        ctx.fillStyle = g;
        ctx.fill();
        ctx.closePath();
    }

    const handleClick = (event: { nativeEvent: { offsetX: any; offsetY: any; }; }) => {
        // 当前鼠标位于canvas相对位置
        const { offsetX, offsetY } = event.nativeEvent;

        // 如果鼠标位置不在棋盘上，不做任何操作
        if (offsetX < 25 || offsetY < 25 || offsetX > 775 || offsetY > 775) return;
        // 已经结束游戏了
        if (endGame) return;

        // 计算棋子的位置
        let i = Math.floor((offsetX + 25) / 50) - 1;
        let j = Math.floor((offsetY + 25) / 50) - 1;

        // 判断当前位置是否已经存在棋子
        if (pieces[j][i]) return;

        // 将当前索引在二维数组中标记为黑棋或白棋
        pieces[j][i] = isBlackRound ? "black" : "white";

        // 由于在定义棋盘时，预留100的长度，所以第1条线的位置为50，第2条线的位置在100，以此类推
        // 可以得知，横纵线的坐标值都是整数，可以通过 Math.floor(鼠标的坐标 / 50) * 50 来得到整数坐标
        // 因为一个格子宽是50，我们可以将 鼠标的坐标值 都加上 25 去计算，这样就能落到最近的框线上
        // 这里需要点想象空间，可以说是只能意会，言传很难
        // 计算绘制棋子
        drawPiece((i + 1) * 50, (j + 1) * 50);

        // 检查是否满足获胜条件
        const isEndGame = checkAll({
            pieces,
            isBlack: isBlackRound,
            row: j,
            col: i
        });
        if (isEndGame) {
            setEndGame(isEndGame);
            return;
        }

        // 切换黑白棋
        setIsBlackRound(!isBlackRound);
    }

    const handleRestart = () => {
        window.location.reload();
    }

    return (
        <div className="string-tool-main">
            <div className="title" style={{ textAlign: 'center' }}>
                <span>【五子棋】</span>
                <span>当前状态：
                    {
                        endGame
                            ? isBlackRound ? "黑棋获胜" : "白棋获胜"
                            : isBlackRound ? "黑棋回合" : "白棋回合"
                    }
                </span>
                <span style={{ cursor: 'pointer' }} onClick={handleRestart}>【重新开始】</span>
            </div>
            <canvas id="el-canvas" onClick={handleClick} ></canvas>
            {
                endGame
                    ? <Dialog>
                        <OverDialog isBlack={isBlackRound} />
                    </Dialog>
                    : <></>
            }
        </div>
    );
}

