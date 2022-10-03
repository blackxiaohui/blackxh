import { Button, Input } from "antd";
import { FC, useEffect, useState } from "react";
import { convertToHex } from "../../utils";

import "./index.less";



export const GetColorTool: FC = () => {

    const [imgBox, setImgBox] = useState<HTMLImageElement>();
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const [inputBox, setInputBox] = useState<HTMLInputElement>();
    const [colorRgb, setColorRgb] = useState<[number, number, number]>([0, 0, 0]);
    const [colorHex, setColorHex] = useState<string>("ffffff");

    useEffect(() => {
        setCanvas(document.createElement('canvas') as HTMLCanvasElement);
        setImgBox(document.getElementById('img-box') as HTMLImageElement);
        setInputBox(document.getElementById('img') as HTMLInputElement);
    }, []);

    // 文件选择组件变化时更新其选择完毕事件
    useEffect(() => {
        // 初始化未完成
        if (!inputBox || !imgBox || !canvas) {
            return;
        }

        let img_width = 0;
        let img_height = 0;
        // 上下文操作对象
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        // 文件选择完毕
        inputBox.onchange = function (event) {
            const files = (event.target as HTMLInputElement).files;
            if (!files || !files?.length) {
                return;
            }
            const img: File = files[0];;
            if (!(img.type && img.type.indexOf('image') == 0 && /\.(?:jpg|png|gif|jpeg)$/.test(img.name))) {
                alert('仅支持jpg|jpeg|gif|png格式');
                return;
            }
            // 渲染
            var reader = new FileReader();
            reader.readAsDataURL(img);

            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target?.result as string;
                // 检索imgBox中的图片元素，有则清理
                var childs = imgBox?.getElementsByTagName("img");
                if (childs?.length) {
                    imgBox?.removeChild(childs[childs.length - 1]);
                }
                imgBox?.appendChild(image);
                // 图片加载完成事件
                image.onload = function () {
                    img_width = (+image.offsetWidth);
                    img_height = (+image.offsetHeight);
                    // 设置画布尺寸 
                    canvas.width = +image.offsetWidth;
                    canvas.height = +image.offsetHeight;
                    // 将图片按像素写入画布 
                    context.drawImage(image, 0, 0);
                }
            }
        }

        let scrollTop = 0;
        let scrollLeft = 0;

        imgBox.addEventListener('scroll', (event) => {
            scrollTop = ((event.target as HTMLElement).scrollTop);
            scrollLeft = ((event.target as HTMLElement).scrollLeft);
        })

        imgBox.addEventListener('click', (event) => {
            getColor(
                context,
                event.pageX - imgBox.offsetLeft + scrollLeft,
                event.pageY - imgBox.offsetTop + scrollTop,
                img_width,
                img_height
            );
        })

    }, [imgBox, canvas, inputBox]);


    const getImage = () => {
        var inputBox = document.getElementById('img') as HTMLInputElement;
        inputBox.click();
    }

    const getColor = (
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        img_width: number,
        img_height: number
    ) => {
        var imageData = context.getImageData(x, y, img_width, img_height);
        var hexColor = convertToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
        setColorRgb([imageData.data[0], imageData.data[1], imageData.data[2]]);
        setColorHex(hexColor);
    }



    return (
        <div className="get-color-tool-main">
            <div className="title">图片取色器</div>
            <div className="item-box">
                <div className="item">
                    <div className="item-title">HEX</div>
                    <Input value={colorHex ? "#" + colorHex : ""}></Input>
                </div>
                <div className="item rgb-item">
                    <div className="item-title">RGB</div>
                    <Input value={colorRgb[0]}></Input>
                    <Input value={colorRgb[1]} className="middle-item"></Input>
                    <Input value={colorRgb[2]}></Input>
                </div>
                <div className="item" >
                    <div className="item-title">颜色预览</div>
                    <div style={{ borderRadius: "6px", height: "32px", flex: 1, backgroundColor: "#" + colorHex }}></div>
                </div>
                <div className="item" >
                    <Button className="select-btn" onClick={getImage}>选择</Button>
                </div>
            </div>
            <div className="img-box" id="img-box"></div>
            <input type="file" className="input" id="img" />
        </div>
    );
}
