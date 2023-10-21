
interface ICheckParam {
    isBlack: boolean;
    pieces: any;
    row: number;
    col: number;
}

// 整体检查是否满足获胜条件
export const checkAll = ({ isBlack, pieces, row, col }: ICheckParam) => {
    const chks = [[1, 0], [0, 1], [1, 1], [1, -1]]; // 分别指示连续计算的四个方向（水平，纵向，斜下，斜上）
    const target = isBlack ? 'black' : 'white';
    let isOver = false;
    // 米字型计算结果，以当前落子位置计算是否存在某个方向上具有连续的五个相同棋子
    for (let j = 0; j < chks.length; j++) {
        // 当前棋子算一个
        let num = 1;
        // 当前计算的方向
        const chk = chks[j];
        for (let i = 1; i <= 4; i++) {
            if (pieces[row + chk[0] * i]?.[col + chk[1] * i] === target) {
                num++;
            }
            // 正向没有连续的棋子则反向遍历
            // 注意，反向计算时不需要清空num暂存
            else {
                for (i = -1; i >= -4; i--) {
                    if (pieces[row + chk[0] * i]?.[col + chk[1] * i] === target) {
                        num++;
                    }
                    else {
                        break;
                    }
                }
                break;
            }
        }
        if (num >= 5) {
            isOver = true;
            break;
        }
    }
    return isOver;
}