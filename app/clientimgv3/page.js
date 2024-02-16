"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar2";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
/* import Navbar from "@/components/Navbar2"; */

const iKUrlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT1;

export default function UploadForm() {
  const defaultImg = {
    title: "Loading ...",
    userName: "assets",
    permalink: "dummy-image.svg",
    uploadDate: "220304200124",
    tags: [],
  };

  const [popUp, setPopUp] = useState(false);
  const [image, setImage] = useState([defaultImg]);
  const [reload, setReload] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedFile, setSelectedFile] = useState("empty");
  const [uploading, setUploading] = useState(false);
  const [imgSubmit, setImgSubmit] = useState(defaultImg);
  const [imageDetail, setImageDetail] = useState(defaultImg);
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

  useEffect(() => {
    console.log(imageDetail);
  }, [imageDetail]);

  const selectedImageDetail = (image) => {
    /* const { permalink, userName, uploadDate } = image; */
    setImageDetail({
      userName: image.userName,
      permalink: image.permalink,
      uploadDate: image.uploadDate,
    });

    setImgSubmit({
      fileId: image.fileId,
      userName: image.userName,
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

  console.log(imageDetail);

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
          permalink: value.replace(/ /g, "-"),
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
      setImgSubmit(defaultImg);
      setImageDetail(defaultImg);
      setReload(true);
    } catch (err) {
      // Handle errors here
      console.error(err);
    }
    setUploading(false);
  };

  /* ------------------ Handle image delete ------------------ */

  const deleteImg = async (e) => {
    setUploading(true);
    e.preventDefault();

    const imgDelete = imgSubmit;
    imgDelete.action = "Delete";

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
      setImageDetail(defaultImg);
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
      <Navbar />
      <div
        className={
          popUp
            ? "fixed z-10 flex w-screen flex-col items-center bg-red-900"
            : "hidden"
        }
      >
        <div className=" absolute h-screen w-screen bg-gray-500 opacity-60"></div>
        <div className="absolute w-full px-4 pt-2 lg:px-8">
          <div className="item-center mx-auto flex max-w-[1500px] flex-col rounded-xl bg-white p-2 dark:bg-darkmode">
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
                    libTab ? "relative flex w-full flex-row gap-4" : "hidden"
                  }
                >
                  <div className="mx-auto flex h-[65svh] flex-row flex-wrap content-start  overflow-y-auto sm:h-[35svh] md:h-[40svh] md:basis-8/12 lg:h-[50svh] xl:h-[55svh]">
                    {image.map((image, i) => (
                      <button
                        key={i}
                        className="m-1 self-start border border-cyan-500 focus:bg-slate-50 focus:text-cyan-950 focus:ring"
                        onClick={() => selectedImageDetail(image)}
                      >
                        <Image
                          className="mx-auto h-24 w-24 object-contain"
                          src={
                            iKUrlEndpoint +
                            "/" +
                            image.userName +
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
                  <div className="hidden flex-col gap-1 overflow-y-auto pr-2 md:flex md:h-[40svh] md:basis-4/12 lg:h-[50svh] xl:h-[55svh]">
                    <h1 className="text-xl">Detail :</h1>
                    <div className=" mx-auto mb-2 w-auto border border-cyan-200 p-1">
                      <Image
                        className="h-auto max-h-72 w-full object-contain"
                        src={
                          iKUrlEndpoint +
                          "/" +
                          imageDetail.userName +
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
                      required
                      name="titleUpdate"
                      placeholder="Select your image"
                      value={imgSubmit.title}
                      onChange={handleUpdate}
                    />
                    <p>Permalink :</p>
                    <input
                      required
                      name="permalinkUpdate"
                      placeholder="Select your image"
                      value={imgSubmit.permalink}
                      onChange={handleUpdate}
                    />
                    <p>Tag :</p>
                    <div className="flex flex-row">
                      <input
                        className="rounded-l-lg text-black"
                        type="text"
                        placeholder="Your tag"
                        name="updateTag"
                        onChange={(e) => {
                          setUpdateTag(e.target.value);
                        }}
                        value={updateTag || ""}
                      />
                      <button
                        className="rounded-r-lg bg-blue-400 px-2"
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
                  {imageDetail.userName === "assets" ? (
                    <></>
                  ) : (
                    <div className="absolute flex h-[65svh] w-full flex-col gap-3 overflow-y-auto bg-lightmode dark:bg-darkmode sm:h-[35svh] sm:flex-row md:hidden">
                      <div className="fixed z-10 ml-2 hidden h-[35svh] flex-col justify-center px-2 sm:flex sm:basis-1/12">
                        <div
                          className="rounded-lg bg-red-500 p-2"
                          onClick={() => setImageDetail(defaultImg)}
                        >
                          <h1 className="text-center">Cancel</h1>
                          <ArrowLeftCircleIcon className="mx-auto w-8" />
                        </div>
                      </div>
                      <div
                        onClick={() => setImageDetail(defaultImg)}
                        className="relative mt-2 flex basis-1/12 sm:hidden"
                      >
                        <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-2 py-1">
                          <ArrowLeftCircleIcon className="w-6" />
                          <h1 className="text-center text-lg">Cancel </h1>
                        </div>
                      </div>
                      <div className="relative flex h-[35svh] flex-col justify-center sm:basis-2/12 "></div>
                      <div className="flex basis-6/12 flex-col">
                        <h1 className="text-base">Detail :</h1>
                        <div className=" mx-auto mb-2 w-auto border border-cyan-200 p-1">
                          <Image
                            className="h-auto max-h-72 w-full object-contain"
                            src={
                              iKUrlEndpoint +
                              "/" +
                              imageDetail.userName +
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
                      </div>
                      <div className="flex basis-5/12 flex-col">
                        <p className="text-base">Title :</p>
                        <input
                          required
                          name="titleUpdate"
                          placeholder="Select your image"
                          value={imgSubmit.title || ""}
                          onChange={handleUpdate}
                        />
                        <p>Permalink :</p>
                        <input
                          required
                          name="permalinkUpdate"
                          placeholder="Select your image"
                          value={imgSubmit.permalink}
                          onChange={handleUpdate}
                        />
                        <p>Tag :</p>
                        <div className="flex flex-row">
                          <input
                            className="rounded-l-lg text-black"
                            type="text"
                            placeholder="Your tag"
                            name="updateTag"
                            onChange={(e) => {
                              setUpdateTag(e.target.value);
                            }}
                            value={updateTag || ""}
                          />
                          <button
                            className="rounded-r-lg bg-blue-400 px-2"
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
                  )}
                </div>
                <div
                  className={
                    upTab
                      ? "flex h-[60svh] w-full flex-col justify-start gap-4 p-2 sm:h-[40svh] sm:flex-row lg:h-[60svh]"
                      : "hidden"
                  }
                >
                  <div className="lg flex flex-col items-start overflow-y-auto p-1 sm:h-[35svh] sm:basis-3/6 md:h-[38svh] lg:h-[55svh]">
                    <div className="pb-2 text-sm lg:text-xl">
                      Select your image
                    </div>
                    <label
                      className="relative mb-1 flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-gray-400 p-1"
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
                        required
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
                  <div className="item-start flex basis-3/6 flex-col gap-1 overflow-y-auto text-sm sm:h-[35svh] md:h-[38svh] lg:h-[55svh] lg:text-lg">
                    <p>Title :</p>
                    <input
                      required
                      placeholder="Your title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title || ""}
                    />
                    <p>Permalink :</p>
                    <input
                      required
                      placeholder={title.replace(/ /g, "-")}
                      onChange={(e) => setPermalink(e.target.value)}
                      value={permalink || ""}
                    />
                    <p>Tags :</p>
                    <div className=" flex flex-row">
                      <input
                        className="rounded-l-lg text-black"
                        type="text"
                        placeholder="Your tag"
                        onChange={(e) => {
                          setTag(e.target.value);
                        }}
                        value={tag || ""}
                      />
                      <button
                        className="rounded-r-lg bg-blue-400 px-2"
                        onClick={newTag}
                      >
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
                  </div>
                </div>
              </div>
            </div>
            {upTab ? (
              <div className="flex flex-row content-center justify-center p-2">
                <button
                  type="button"
                  className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={closePopUp}
                >
                  Cancel
                </button>
                <button
                  onClick={onUpload}
                  disabled={uploading}
                  style={{ opacity: uploading ? ".5" : "1" }}
                  className=" mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            ) : (
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
            )}
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
