"use client";

import Navbar from "@/components/Navbar2";
import styles from "./page.module.css";
import ImageLib from "@/components/ImageLib";
import React, { useEffect } from "react";
import { useState, useRef } from "react";

export default function UploadForm() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const [popUp, setPopUp] = useState(false);

  function openImageLib() {
    setPopUp(true);
  }

  function closeImageLib() {
    setPopUp(false);
  }

  /* ------------------ Handle image submit to page ------------------ */

  const handleSubmit = () => {
    console.log("Success");
    setPopUp(false);
  };

  return (
    <div className="relative">
      <div
        className={
          popUp
            ? "fixed z-30 flex w-full shrink items-center justify-center "
            : "hidden"
        }
      >
        <div className=" absolute -my-6 h-[150svh] w-screen bg-gray-500 opacity-60"></div>
        <div className=" relative mx-4 my-2 flex h-full w-full max-w-[1500px] flex-col gap-2 bg-lightmode p-2 text-center text-lg dark:bg-darkmode">
          <ImageLib ref={inputRef} />
          <div className="flex- row  flex content-center justify-center p-2">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={closeImageLib}
            >
              Cancel
            </button>
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Navbar />
      {/* <ImageLib popUp={popUp} ref={inputRef}/> */}

      <div className="relative mx-auto max-w-7xl">
        <div className="mt-16 flex flex-col gap-4 p-8 text-center text-lg">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta
            at neque nec feugiat. Suspendisse volutpat in sem a congue.
            Pellentesque non sodales ipsum. Maecenas pharetra et augue quis
            sodales. Nam dictum velit vitae nisl pharetra, vitae rutrum lectus
            dictum. Duis ut varius odio. Fusce vel tempus lectus, vitae tempor
            magna. Aenean ut malesuada dolor, sed tristique est. Nunc id erat ut
            metus lacinia placerat non sed libero.
          </p>
          <p>
            Vestibulum sed congue leo, in bibendum leo. Donec elementum
            consequat ipsum, eu finibus dui interdum eu. Fusce molestie nisi
            lorem, malesuada commodo est scelerisque ut. Donec ut enim lorem.
            Duis ut risus dolor. Sed ante nibh, sollicitudin ornare risus a,
            dapibus lacinia sapien. Maecenas luctus placerat enim at tempor.
            Proin sed nulla ac nibh congue ornare.
          </p>
          <p>
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam
            hendrerit condimentum orci, sit amet feugiat orci iaculis sit amet.
            Mauris laoreet quam ac augue sollicitudin, at vulputate urna
            efficitur. Maecenas vel cursus elit. Aliquam varius metus eu egestas
            hendrerit. Vestibulum viverra luctus viverra. Suspendisse blandit
            hendrerit neque nec pellentesque.
          </p>
        </div>

        <button onClick={openImageLib}>Open</button>

        <div className="mt-24 flex flex-col gap-4 p-8 text-center text-lg">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta
            at neque nec feugiat. Suspendisse volutpat in sem a congue.
            Pellentesque non sodales ipsum. Maecenas pharetra et augue quis
            sodales. Nam dictum velit vitae nisl pharetra, vitae rutrum lectus
            dictum. Duis ut varius odio. Fusce vel tempus lectus, vitae tempor
            magna. Aenean ut malesuada dolor, sed tristique est. Nunc id erat ut
            metus lacinia placerat non sed libero.
          </p>
          <p>
            Vestibulum sed congue leo, in bibendum leo. Donec elementum
            consequat ipsum, eu finibus dui interdum eu. Fusce molestie nisi
            lorem, malesuada commodo est scelerisque ut. Donec ut enim lorem.
            Duis ut risus dolor. Sed ante nibh, sollicitudin ornare risus a,
            dapibus lacinia sapien. Maecenas luctus placerat enim at tempor.
            Proin sed nulla ac nibh congue ornare.
          </p>
          <p>
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam
            hendrerit condimentum orci, sit amet feugiat orci iaculis sit amet.
            Mauris laoreet quam ac augue sollicitudin, at vulputate urna
            efficitur. Maecenas vel cursus elit. Aliquam varius metus eu egestas
            hendrerit. Vestibulum viverra luctus viverra. Suspendisse blandit
            hendrerit neque nec pellentesque.
          </p>
          <p>
            Suspendisse tempus nunc lorem, eu commodo nunc tincidunt vel.
            Suspendisse et ex nec orci malesuada placerat. Praesent quis mollis
            tortor, vitae commodo tellus. Cras et nibh diam. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Cras suscipit sapien eget volutpat maximus. Integer
            vel augue tempor, facilisis enim vel, viverra mauris. Maecenas
            bibendum metus sit amet faucibus facilisis. Donec malesuada nisi sed
            orci volutpat auctor eget vel tellus.
          </p>
          <p>
            Morbi suscipit urna nec nulla rhoncus maximus. Pellentesque tempus
            augue nec hendrerit pharetra. Donec sed augue consequat, gravida
            felis semper, congue urna. Proin sagittis, orci et commodo pretium,
            ligula lorem faucibus ligula, feugiat imperdiet lacus diam ac
            tortor. Morbi euismod sapien libero, id luctus sapien porta vitae.
            Mauris sed aliquet mauris, vitae facilisis purus. In mollis nisl non
            eleifend hendrerit. Mauris elementum elit nec massa vestibulum
            dictum. Maecenas accumsan elementum elit. Maecenas et orci a ligula
            ultricies facilisis. Maecenas luctus tortor hendrerit, posuere urna
            sed, tincidunt dolor. In sit amet tortor a nisi lacinia elementum
            vitae ac lorem. Sed dictum malesuada imperdiet. Proin eu egestas
            nunc. Curabitur aliquam ornare mauris in faucibus.
          </p>
          <p>
            Mauris augue felis, faucibus non mauris at, bibendum pretium turpis.
            Vestibulum ante metus, pharetra eget sapien vel, eleifend mattis
            lacus. Integer quis molestie mauris, et bibendum dui. Fusce nec
            iaculis est, ut convallis turpis. Praesent at pretium tortor.
            Vivamus accumsan mauris non orci sagittis, scelerisque iaculis dolor
            placerat. Duis non sapien iaculis, rhoncus arcu sed, convallis dui.
            Ut ut viverra odio, a rutrum lectus. Curabitur facilisis
            sollicitudin nulla, non fringilla lorem scelerisque venenatis. Fusce
            fermentum ligula convallis, condimentum erat non, mollis est. Ut id
            dolor lectus. Sed in dignissim ante. Nunc sed tempus nisi.
            Pellentesque a erat a velit laoreet convallis quis ut leo.
          </p>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Suspendisse semper suscipit pellentesque. In
            vel nisi velit. Aliquam vitae nibh a nulla aliquet hendrerit.
            Integer tempus urna at tellus malesuada, at vestibulum elit maximus.
            Sed vitae neque dolor. Quisque sagittis quam augue, a sodales nisl
            ullamcorper eu. Maecenas tincidunt sed quam eget auctor. Ut orci
            nisl, vulputate ac pulvinar vitae, euismod sit amet odio. In hac
            habitasse platea dictumst. Mauris dapibus vulputate viverra. Donec
            quis ante lorem. In nec molestie nunc. Aenean ipsum libero, luctus
            quis urna non, tincidunt condimentum leo. Donec ac rutrum mi, et
            feugiat massa.
          </p>
        </div>
      </div>
    </div>
  );
}
