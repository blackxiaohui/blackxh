
// RGB转换为16进制颜色
export const convertToHex = (r: number | string, g: number | string, b: number | string) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    r.length == 1 ? r = '0' + r : '';
    g.length == 1 ? g = '0' + g : '';
    b.length == 1 ? b = '0' + b : '';
    var hex = r + g + b;
    return hex;
}

