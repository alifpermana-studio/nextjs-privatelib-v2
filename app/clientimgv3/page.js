"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
/* import Navbar from "@/components/Navbar2"; */

const iKUrlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT1;

export default function UploadForm() {
  const [popUp, setPopUp] = useState(false);
  const [image, setImage] = useState([
    {
      title: "Loading ...",
      permalink: "dummy-image.jpg",
    },
  ]);
  const [reload, setReload] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedFile, setSelectedFile] = useState("empty");
  const [uploading, setUploading] = useState(false);
  const [imgSubmit, setImgSubmit] = useState({
    title: "Select your image",
    permalink: "dummy-image.jpg",
    tags: [],
  });
  const [imageDetail, setImageDetail] = useState({
    folder: "assets",
    permalink: "dummy-image.svg",
    uploadDate: "220304200124",
  });
  const [updateImage, setUpdateImage] = useState({
    action: "Update",
    update: false,
    tags: [],
  });
  const [libTab, setLibTab] = useState(true);
  const [upTab, setUpTab] = useState(false);
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);
  const [updateTag, setUpdateTag] = useState();
  const [title, setTitle] = useState("");
  const [permalink, setPermalink] = useState("");
  const [uploadImage, setUploadImage] = useState("");

  /* ------------------ Handle open and close Image Component ------------------ */
  const openPopUp = () => {
    setPopUp(true);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  /* ------------------ Handle database image load ------------------ */
  useEffect(() => {
    let loadImg = true;
    setReload(false);

    const getImage = async () => {
      const resGet = await fetch("/api/images", {
        method: "GET",
      });
      const { result } = await resGet.json();

      if (loadImg) {
        setImage(result.reverse());
        console.log(result);
      }
    };

    setTimeout(() => {
      getImage().catch(console.error);
    }, 5000);

    return () => (loadImg = false);
  }, [reload /* image */]);

  /* ------------------ Handle image tab ------------------ */
  const imageCollection = () => {
    setLibTab(true);
    setUpTab(false);
  };

  const imageUpload = () => {
    setUpTab(true);
    setLibTab(false);
  };

  /* ------------------ Handle image detail update ------------------ */

  const selectedImageDetail = (image) => {
    const { permalink, folder, uploadDate } = image;
    setImageDetail({
      folder: folder,
      permalink: permalink,
      uploadDate: uploadDate,
    });
    setImgSubmit({
      fileId: image.fileId,
      folder: image.folder,
      id: image.id,
      permalink: image.permalink,
      purgeRequestId: image.purgeRequestId,
      tags: image.tags,
      title: image.title,
      uploadDate: image.uploadDate,
      userId: image.userId,
      oldPermalink: image.permalink,
    });
  };

  useEffect(() => {
    /* setUpdateImage({
      action: "Update",
      update: true,
      title: imgSubmit.title,
      permalink: imgSubmit.permalink,
      tags: imgSubmit.tags,
      oldPermalink: imageDetail.permalink,
      fileId: imgSubmit.fileId,
      uploadDate: imgSubmit.uploadDate,
      folder: imgSubmit.folder,
    }); */

    console.log(imgSubmit);
  }, [imgSubmit, updateTag, imageDetail]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setImgSubmit((prevValue) => {
      if (name === "titleUpdate") {
        return {
          ...prevValue,
          title: value,
        };
      } else if (name === "permalinkUpdate") {
        return {
          ...prevValue,
          permalink: value,
        };
      }
    });
  };

  const newUpdateTag = () => {
    setImgSubmit((prevValue) => {
      return {
        ...prevValue,
        tags: [...prevValue.tags, updateTag.replace(/ /g, "-")],
      };
    });
    setUpdateTag();
  };

  const deleteUpdateTag = (e) => {
    const delTag = e.target.alt;

    setImgSubmit((prevValue) => {
      return {
        ...prevValue,
        tags: prevValue.tags.filter((updateTag) => updateTag !== delTag),
      };
    });
  };

  const updateImg = async (e) => {
    setUploading(true);
    e.preventDefault();
    const imgUpdate = imgSubmit;
    imgUpdate.action = "Update";

    try {
      const resPost = await fetch("/api/imagekit", {
        method: "POST",
        body: JSON.stringify(imgSubmit),
      });
      const { imageKitStatus } = await resPost.json();
      console.log(imageKitStatus);

      // handle the error
      if (!resPost.ok) {
        throw new Error(await resPost.text());
      }
      setImgSubmit({
        title: "Select your image",
        permalink: "dummy-image.jpg",
        tags: [],
      });
      setReload(true);
    } catch (err) {
      // Handle errors here
      console.error(err);
    }
    setUploading(false);
  };

  /* ------------------ Handle image delete ------------------ */

  const deleteImg = async (e) => {
    const imgDelete = {
      action: "Delete",
      update: true,
      title: imgSubmit.title,
      permalink: imgSubmit.permalink,
      tags: imgSubmit.tags,
      oldPermalink: imageDetail.permalink,
      fileId: imgSubmit.fileId,
    };

    setUploading(true);
    e.preventDefault();

    try {
      const resPost = await fetch("/api/imagekit", {
        method: "POST",
        body: JSON.stringify(imgDelete),
      });

      const { imageKitStatus } = await resPost.json();
      console.log(imageKitStatus);

      // handle the error
      if (!resPost.ok) {
        throw new Error(await resPost.text());
      }
      setReload(true);
    } catch (err) {
      // Handle errors here
      console.error(err);
    }

    setImgSubmit({
      title: "Select your image",
      permalink: "dummy-image.jpg",
      tags: [],
    });
    setUploading(false);
  };

  /* ------------------ Handle image upload ------------------ */

  useEffect(() => {
    if (!permalink) {
      const permalink = title.replace(/ /g, "-");
      setUploadImage({
        title: title,
        permalink: permalink,
        tags: tags,
        imageData: selectedFile,
        action: "Upload",
      });
    } else {
      setUploadImage({
        title: title,
        permalink: permalink,
        tags: tags,
        imageData: selectedFile,
        action: "Upload",
      });
    }
  }, [title, permalink, tags, selectedFile]);

  const newTag = () => {
    if (tag) {
      setTags((prevTags) => {
        return [...prevTags, tag.replace(/ /g, "-")];
      });
      setTag();
    }
  };

  const deleteTags = (e) => {
    const delTag = e.target.alt;
    setTags(tags.filter((tag) => tag !== delTag));
  };

  const onUpload = async (e) => {
    setUploading(true);
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const resPost = await fetch("/api/imagekit", {
        method: "POST",
        body: JSON.stringify(uploadImage),
      });

      const { imageKitStatus } = await resPost.json();
      console.log(imageKitStatus);

      setReload(true);

      // handle the error
      if (!resPost.ok) {
        throw new Error(await resPost.text());
      }
    } catch (err) {
      // Handle errors here
      console.error(err);
    }

    setTitle("");
    setPermalink("");
    setTags([]);
    setSelectedImage();
    setUploading(false);
  };

  /* ------------------ Handle image submit to page ------------------ */

  const handleSubmit = () => {
    console.log(imgSubmit);
    setPopUp(false);
  };

  return (
    <div className="relative">
      <div
        className={
          popUp
            ? "fixed z-10 flex w-screen flex-col items-center bg-red-900"
            : "hidden"
        }
      >
        <div className=" absolute h-screen w-screen bg-gray-500 opacity-60"></div>
        <div className="absolute w-96 pt-2 md:w-[700px] lg:w-[1000px] xl:h-[520px] xl:w-[1200px]">
          <div className="item-center mx-auto flex flex-col bg-white p-2 dark:bg-darkmode">
            <div className="mx-auto py-2 text-xl">Media Library</div>
            <div className="item-center flex flex-col">
              <div className="border-b border-gray-200 pl-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <ul className="justify-left flex flex-row gap-6 text-base">
                  <li>
                    <button
                      onClick={imageCollection}
                      aria-pressed={libTab ? "true" : "false"}
                      className="inline-block rounded-t-lg border-b-2 border-transparent pb-1 hover:border-gray-300 hover:text-gray-600 aria-pressed:border-gray-300 aria-pressed:font-extrabold dark:text-gray-300"
                    >
                      Image Collection
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={imageUpload}
                      aria-pressed={upTab ? "true" : "false"}
                      className="inline-block rounded-t-lg border-b-2 border-transparent pb-1 hover:border-gray-300 hover:text-gray-600 aria-pressed:border-gray-300 aria-pressed:font-extrabold dark:text-gray-300"
                    >
                      Image Upload
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex flex-row justify-center">
                <div
                  className={
                    libTab ? "flex w-full  flex-row gap-4 p-2" : "hidden"
                  }
                >
                  <div className="m-0 flex basis-8/12 flex-row flex-wrap content-start justify-start overflow-y-auto  p-0 xl:h-[340px]">
                    {image.map((image, i) => (
                      <button
                        key={i}
                        className="m-1 border border-cyan-500 focus:bg-slate-50 focus:text-cyan-950 focus:ring"
                        onClick={() => selectedImageDetail(image)}
                      >
                        <Image
                          className="h-32 w-32 object-contain"
                          src={
                            iKUrlEndpoint +
                            "/" +
                            image.folder +
                            "/" +
                            image.uploadDate +
                            "-" +
                            image.permalink
                          }
                          alt={image.permalink}
                          width={200}
                          height={100}
                        />
                        <p>{image.title.slice(0, 12)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex h-[340px] basis-4/12 flex-col gap-1 overflow-y-auto pr-2">
                    <h1 className="text-xl">Detail :</h1>
                    <div className=" mx-auto mb-2 w-auto border border-cyan-200 p-1">
                      <Image
                        className="h-auto max-h-72 w-full object-contain"
                        src={
                          iKUrlEndpoint +
                          "/" +
                          imageDetail.folder +
                          "/" +
                          imageDetail.uploadDate +
                          "-" +
                          imageDetail.permalink
                        }
                        alt={imageDetail}
                        width={200}
                        height={100}
                      />
                    </div>
                    <p>Title :</p>
                    <input
                      name="titleUpdate"
                      placeholder="Select your image"
                      value={
                        updateImage.update ? updateImage.title : imgSubmit.title
                      }
                      onChange={handleUpdate}
                    />
                    <p>Permalink :</p>
                    <input
                      name="permalinkUpdate"
                      placeholder="Select your image"
                      value={
                        updateImage.update
                          ? updateImage.permalink
                          : imgSubmit.permalink
                      }
                      onChange={handleUpdate}
                    />
                    <p>Tag :</p>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        placeholder="Your tag"
                        name="updateTag"
                        onChange={(e) => {
                          setUpdateTag(e.target.value);
                        }}
                        value={updateTag || ""}
                      />
                      <button
                        className="bg-blue-400 px-2"
                        onClick={newUpdateTag}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {imgSubmit.tags.map((tag, i) => {
                        return (
                          <div
                            key={i}
                            className="m-1 flex flex-row rounded-md bg-blue-500"
                          >
                            <div className="px-2">{tag}</div>
                            <div
                              className="flex flex-row rounded-r-md bg-red-600 px-2"
                              onClick={deleteUpdateTag}
                              value={updateTag}
                            >
                              <Image
                                className="m-auto h-4 w-4"
                                src="/cross-sign.svg"
                                alt={tag || ""}
                                width={1}
                                height={1}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-row content-center justify-center p-2">
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={deleteImg}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={updateImg}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    upTab
                      ? "flex h-[350px] w-full flex-row justify-start gap-4 p-2"
                      : "hidden"
                  }
                >
                  <div className="flex basis-3/6 flex-col items-start p-1">
                    <div className="pb-2 text-xl">Select your image</div>
                    <label
                      className="relative mb-1 flex aspect-video h-full w-full cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-gray-400 p-1"
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files) {
                          const file = e.dataTransfer.files?.[0];
                          var binaryData = [];
                          binaryData.push(file);
                          const reader = new FileReader();
                          if (file) {
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                              setSelectedFile(reader.result);
                            };
                          }
                          if (file) {
                            setSelectedImage(
                              URL.createObjectURL(
                                new Blob(binaryData, { type: "file" }),
                              ),
                            );
                          }
                        }
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files?.[0];
                            var binaryData = [];
                            binaryData.push(file);
                            const reader = new FileReader();
                            if (file) {
                              reader.readAsDataURL(file);
                              reader.onloadend = () => {
                                setSelectedFile(reader.result);
                              };
                            }
                            if (file) {
                              setSelectedImage(
                                URL.createObjectURL(
                                  new Blob(binaryData, { type: "file" }),
                                ),
                              );
                            }
                          }
                        }}
                      />

                      <div className="">
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            alt=""
                            fill={true}
                            style={{ objectFit: "contain" }}
                          />
                        ) : (
                          <Image
                            src={"/dummy-upload.svg"}
                            alt="Upload Image"
                            width={100}
                            height={100}
                          />
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="item-start flex basis-3/6 flex-col gap-1 overflow-y-auto pt-10 text-lg">
                    <p>Title :</p>
                    <input
                      placeholder="Your title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title || ""}
                    />
                    <p>Permalink :</p>
                    <input
                      placeholder={title.replace(/ /g, "-")}
                      onChange={(e) => setPermalink(e.target.value)}
                      value={permalink || ""}
                    />
                    <p>Tags :</p>
                    <div className=" flex flex-row">
                      <input
                        type="text"
                        placeholder="Your tag"
                        onChange={(e) => {
                          setTag(e.target.value);
                        }}
                        value={tag || ""}
                      />
                      <button className="bg-blue-400 px-2" onClick={newTag}>
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {tags.map((tag, i) => {
                        return (
                          <div
                            key={i}
                            className="m-1 flex flex-row rounded-md bg-blue-500"
                          >
                            <div className="px-2">{tag}</div>
                            <div
                              className="flex flex-row rounded-r-md bg-red-600 px-2"
                              onClick={deleteTags}
                              value={tag}
                            >
                              <Image
                                className="m-auto h-4 w-4"
                                src="/cross-sign.svg"
                                alt={tag || ""}
                                width={1}
                                height={1}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={onUpload}
                      disabled={uploading}
                      style={{ opacity: uploading ? ".5" : "1" }}
                      className=" w-32 rounded bg-red-600 p-3 text-center text-white"
                    >
                      {uploading ? "Uploading.." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row content-center justify-center p-2">
              <button
                type="button"
                className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={closePopUp}
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
      </div>
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

        <button className="absolute" onClick={openPopUp}>
          Open
        </button>

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
