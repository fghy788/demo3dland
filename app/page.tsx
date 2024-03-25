"use client";
import Image from "next/image";
import { MyCanvas } from "./MyCanvas";
import { useEffect, useState } from "react";

export default function Home() {
   const [TextBox, setTextBox] = useState<boolean>(false);

   useEffect(() => {
      console.log(TextBox);
   }, [TextBox]);
   return (
      <main className="w-screen h-screen">
         <MyCanvas setTextBox={setTextBox} />
         {TextBox && (
            <>
               <div className={`w-[90%] h-[10rem] rounded-2xl fixed z-10 bg-white bottom-10  right-0 left-0 m-auto flex item-center justify-center`}>
                  <span>이 페이지는 기능 설명을 위해 구현 되었습니다. w,a,s,d로 조작이 가능하며 특정 조건을 만족할때 화면 아래에 팝업이 표시됩니다.</span>
                  <span>피라미드의 앞으로가서 팝업창이 다시 뜨는 걸 확인해보세요!</span>
               </div>
            </>
         )}
      </main>
   );
}
