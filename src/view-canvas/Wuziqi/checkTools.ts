
interface ICheckParam {
    isBlack: boolean;
    pieces: any;
    row: number;
    col: number;
}

// 纵向查找是否有连续5个相同的棋子
const checkVertical = ({ isBlack, pieces, row, col }: ICheckParam): boolean => {
    // 定义一个向上的索引器
    let up = 0;
    // 定义一个向下的索引器
    let down = 0;
    // 定义一个计数器，用来记录连续几个相同的
    let count = 1;
    // 只需要循环4次，当前棋子不需要计算，根据五子棋规则（算法可再优化）
    for (let times = 0; times < 4; times++) {
        let target = isBlack ? "black" : "white";
        // 向上查找
        up++;
        // 当行数小于向上索引，则不做任何处理
        if (row - up >= 1) {
            if (pieces[row - up][col] && pieces[row - up][col] === target) {
                count++;
            }
        }
        // 向下查找
        down++;
        // 当行数大于向下索引，则不做任何处理
        if (row + down <= 15) {
            if (pieces[row + down][col] && pieces[row + down][col] === target) {
                count++;
            }
        }

        // 累计5次就匹配成功
        if (count >= 5) {
            break;
        }
    }
    return count >= 5;
}

// 横向查找是否有连续5个相同的棋子
const checkHorizontal = ({ isBlack, pieces, row, col }: ICheckParam): boolean => {
    // 定义一个向左的索引器
    let left = 0;
    // 定义一个向右的索引器
    let right = 0;
    // 定义一个计数器，用来记录连续几个相同的
    let count = 1;
    // 只需要循环4次，当前棋子不需要计算，根据五子棋规则（算法可再优化）
    for (let times = 0; times < 4; times++) {
        let target = isBlack ? "black" : "white";
        // 向左查找
        left++;
        // 当列数小于向左索引，则不做任何处理
        if (col - left >= 1) {
            if (pieces[row][col - left] && pieces[row][col - left] === target) {
                count++;
            }
        }
        // 向右查找
        right++;
        // 当列数大于向右索引，则不做任何处理
        if (col + right <= 15) {
            if (pieces[row][col + right] && pieces[row][col + right] === target) {
                count++;
            }
        }

        // 累计5次就匹配成功
        if (count >= 5) {
            break;
        }
    }
    return count >= 5;
}

// 从左上到右下查找是否有连续5个相同的棋子
const checkNW2SE = ({ isBlack, pieces, row, col }: ICheckParam): boolean => {
    // 定义一个向左上的索引器
    let lt = 0;
    // 定义一个向右下的索引器
    let rb = 0;
    // 定义一个计数器，用来记录连续几个相同的
    let count = 1;
    // 只需要循环4次，当前棋子不需要计算，根据五子棋规则（算法可再优化）
    for (let times = 0; times < 4; times++) {
        let target = isBlack ? "black" : "white";
        // 向左上查找
        lt++;
        // 当行列数都小于向左上索引，则不做任何处理
        if (row - lt >= 1 && col - lt >= 1) {
            if (pieces[row - lt][col - lt] && pieces[row - lt][col - lt] === target) {
                count++;
            }
        }
        // 向右下查找
        rb++;
        // 当行列数大于向右下索引，则不做任何处理
        if (row + rb <= 15 && col + rb <= 15) {
            if (pieces[row + rb][col + rb] && pieces[row + rb][col + rb] === target) {
                count++;
            }
        }

        // 累计5次就匹配成功
        if (count >= 5) {
            break;
        }
    }
    return count >= 5;
}

// 从左上到右下查找是否有连续5个相同的棋子
const checkNE2SW = ({ isBlack, pieces, row, col }: ICheckParam): boolean => {
    // 定义一个向右上的索引器
    let rt = 0;
    // 定义一个向左下的索引器
    let lb = 0;
    // 定义一个计数器，用来记录连续几个相同的
    let count = 1;
    // 只需要循环4次，当前棋子不需要计算，根据五子棋规则（算法可再优化）
    for (let times = 0; times < 4; times++) {
        let target = isBlack ? "black" : "white";
        // 向右上查找
        rt++;
        // 当行数小于向右上索引、列数大于向右上索引，则不做任何处理
        if (row - rt >= 1 && col + rt <= 15) {
            if (pieces[row - rt][col + rt] && pieces[row - rt][col + rt] === target) {
                count++;
            }
        }
        // 向左下查找
        lb++;
        // 当行数大于向左下索引、列数小于向左下索引，则不做任何处理
        if (row + lb <= 15 && col - lb >= 1) {
            if (pieces[row + lb][col - lb] && pieces[row + lb][col - lb] === target) {
                count++;
            }
        }

        // 累计5次就匹配成功
        if (count >= 5) {
            break;
        }
    }
    return count >= 5;
}

// 整体检查是否满足获胜条件
export const checkAll = (params: ICheckParam): boolean => {
    return checkVertical(params)
        || checkHorizontal(params)
        || checkNW2SE(params)
        || checkNE2SW(params);
}
