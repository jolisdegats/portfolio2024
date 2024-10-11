import Shape, { ShapeType } from "../Shape";
import { useAppContext } from "@/lib/hooks";
import { changeModal } from "@/lib/context/ actions";
import Modal from "@/components/Modal";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import me from "@/assets/me.png";
import { useState } from "react";
export const MarkerMe = () => {
    const { dispatch } = useAppContext(); 
    const [isAvatarImage, setIsAvatarImage] = useState(true);
   
    const onClickOnMe = () => {
        dispatch(changeModal({name : "me"}));
    }


    const shape : ShapeType= {
        onClick:onClickOnMe,
        title: 'me',
        type: 'polygon',
        points: "1284.01 964.923 1268.7 998.108 1243.17 1021.08 1222.75 1003.21 1284.01 852.604 1296.77 732.627 1340.17 704.547 1391.23 717.311 1416.75 793.892 1455.04 890.895 1480.57 993.003 1480.57 1164.03 1439.73 1215.09 1406.54 1240.62 1335.07 1250.83 1337.62 1317.2 1465.25 1301.88 1447.38 1414.2 1337.62 1358.04 1271.25 1426.96 1266.14 1350.38 1235.51 1337.62 1179.35 1360.59 1187.01 1317.2 1209.98 1263.59 1171.69 1100.22 1255.93 1092.56",
    }
    return <>
    <Modal name="me">
       <div className="flex items-center justify-center">
       <div className="text-white flex-1 pr-5">
        <p className="text-2xl font-bold">Hey, I&apos;m Julie</p>
        <small className="block mt-1 mb-6"><i>Driven by creativity and logic, now crafting digital experiences.</i></small>
        <div className="text-sm">
        <p>I’ve been hooked on technology ever since I got my first computer at 4 (blame my parents!), and that passion never faded. After spending years in marketing and strategy at startups, I craved something more hands-on and focused on problem-solving. That&apos;s when I made the switch to web development, diving into frontend and enjoying a bit of backend fun along the way!</p>
        <br/>
        <p>When I&apos;m not coding, you&apos;ll find me working on some DIY projects, solving escape rooms, or binge-watching anime. I have a soft spot for pasta and French cuisine (but please note that coriander is my sworn enemy).</p>
        <br/>
        <p>Ready to collaborate and create something amazing?</p>
        </div>
        </div>
        <div className="relative flex-1 h-[500px] ml-2">
            {isAvatarImage ? <Image onClick={() => setIsAvatarImage(!isAvatarImage)} src={avatar.src} alt="avatar" fill objectFit="cover"/> :<Image onClick={() => setIsAvatarImage(!isAvatarImage)} src={me.src} alt="me" fill objectFit="cover"/>}
        </div>
        
        </div>
    </Modal>
    <Shape shape={shape} index="me"/>
    </>
}