
export interface WorkItem {
    id: number;
    title: string;
    subTitle: string;
    link: string;
    background: string;
}

const prefix = process.env.NODE_ENV === 'development' ? '' : '/blackxh'

export const worksList: WorkItem[] = [
    {
        id: 1,
        title: "颜色工具",
        subTitle: "一站式在线处理颜色数据",
        link: prefix + "/#/colortool",
        background: ""
    },
    {
        id: 2,
        title: "文字工具",
        subTitle: "字符串拆分、diff处理",
        link: prefix + "/#/stringtool",
        background: ""
    },
    {
        id: 3,
        title: "五子棋",
        subTitle: "五子棋",
        link: prefix + "/canvas.html#/wuziqi",
        background: ""
    },
    {
        id: 4,
        title: "施工中",
        subTitle: "敬请期待",
        link: "",
        background: ""
    },
    {
        id: 5,
        title: "施工中",
        subTitle: "敬请期待",
        link: "",
        background: ""
    },

];