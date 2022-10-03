import { Timeline } from "antd";
import { FC } from "react";
import { logList } from "@/conf/log";
import "./index.less";



export const Logs: FC = () => {

    return (
        <div className="logs-box">
            <h3>更新日志</h3>
            <Timeline mode={"left"} className="logs-timeline">
                {
                    logList.map(log => {
                        return <Timeline.Item key={log.time} color="#ff7d73" label={log.time}>{log.commit}</Timeline.Item>
                    })
                }
            </Timeline>
        </div>
    );
}