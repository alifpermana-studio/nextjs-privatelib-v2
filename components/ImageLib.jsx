"use client";

import { forwardRef, useState, useEffect } from "react";
import React from "react";
import Image from "next/image";

const iKUrlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT1;

const ImageLib = forwardRef(function ImageLib(props, ref) {
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
  const [imageDetail, setImageDetail] = useState("dummy-image.jpg");
  const [updateImage, setUpdateImage] = useState({
    action: "Update",
    update: false,
    tags: [],
    permalink:"",
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
    const { permalink } = image;
    setImageDetail(permalink);
    setImgSubmit(image);
  };

  useEffect(() => {
    setUpdateImage({
      action: "Update",
      update: true,
      title: imgSubmit.title,
      permalink: imgSubmit.permalink,
      tags: imgSubmit.tags,
      oldPermalink: imageDetail,
      fileId: imgSubmit.fileId,
    });
  }, [imgSubmit, imageDetail]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setImgSubmit((prevValue) => {
      if (name === "titleUpdate") {
        return {
          title: value,
          permalink: prevValue.permalink,
          tags: prevValue.tags,
          fileId: prevValue.fileId,
        };
      } else if (name === "permalinkUpdate") {
        return {
          title: prevValue.title,
          permalink: updateImage.permalink.slice(0,13)+value,
          tags: prevValue.tags,
          fileId: prevValue.fileId,
        };
      }
    });
  };

  const newUpdateTag = () => {
    setImgSubmit((prevValue) => {
      return {
        title: prevValue.title,
        permalink: prevValue.permalink,
        tags: [...prevValue.tags, updateTag.replace(/ /g, "-")],
        fileId: prevValue.fileId,
      };
    });
    setUpdateTag();
  };

  const deleteUpdateTag = (e) => {
    const delTag = e.target.alt;

    setImgSubmit((prevValue) => {
      return {
        title: prevValue.title,
        permalink: prevValue.permalink,
        tags: prevValue.tags.filter((updateTag) => updateTag !== delTag),
        fileId: prevValue.fileId,
      };
    });
  };

  const updateImg = async (e) => {
    setUploading(true);
    e.preventDefault();

    try {
      const resPost = await fetch("/api/imagekit", {
        method: "POST",
        body: JSON.stringify(updateImage),
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
      oldPermalink: imageDetail,
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
    <div ref={ref}>
      <div>Media Library</div>
      <div className=" text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-row gap-6 justify-center text-base">
          <li>
            <button
              onClick={imageCollection}
              aria-pressed={libTab ? "true" : "false"}
              className="flex basis-1/2 pb-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-gray-300 aria-pressed:font-extrabold aria-pressed:border-gray-300"
            >
              Image Collection
            </button>
          </li>
          <li>
            <button
              onClick={imageUpload}
              aria-pressed={upTab ? "true" : "false"}
              className="flex basis-1/2 pb-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-gray-300 aria-pressed:font-extrabold aria-pressed:border-gray-300"
            >
              Image Upload
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-center">
        <div
          className={
            libTab
              ? "relative flex flex-row p-2 gap-4 w-full h-[60svh] sm:h-[40svh] md:h-[45svh] lg:h-[65svh] "
              : "hidden"
          }
        >
          <div className="relative flex flex-row flex-wrap content-start overflow-y-auto lg:basis-8/12">
            {" "}
            {image.map((image, i) => (
              <button
                key={i}
                className="flex flex-col items-center truncate border border-cyan-500 m-1 focus:bg-slate-50 focus:text-cyan-950 focus:ring text-xs w-16 h-18 lg:w-32"
                onClick={() => selectedImageDetail(image)}
              >
                <Image
                  className="h-16 w-16 lg:h-32 lg:w-32 object-contain"
                  src={iKUrlEndpoint + "/" + image.permalink}
                  alt={image.permalink.slice(13)}
                  width={20}
                  height={10}
                />
                <p className="text-ellipsis">{image.title}</p>
              </button>
            ))}
          </div>
          <div className="hidden lg:flex flex-col basis-4/12 pr-2 gap-1 overflow-y-auto text-left ">
            <h1 className="text-xl">Detail :</h1>
            <div className=" p-1 mb-2 w-auto mx-auto border border-cyan-200">
              <Image
                className="h-auto max-h-72 w-full object-contain"
                src={iKUrlEndpoint + "/" + imageDetail}
                alt={(imageDetail==="dummy-image.jpg")? "Select your image":imageDetail}
                width={200}
                height={100}
              />
            </div>
            <p>Title :</p>
            <input
              name="titleUpdate"
              placeholder="Select your image"
              value={updateImage.update ? updateImage.title : imgSubmit.title}
              onChange={handleUpdate}
            />
            <p>Permalink :</p>
            <input
              name="permalinkUpdate"
              placeholder="Select your image"
              value={
                (updateImage.permalink==="dummy-image.jpg")? "Select your image":updateImage.permalink.slice(13)
              }
              onChange={handleUpdate}
            />
            <p>Tag :</p>
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Your tag"
                onChange={(e) => {
                  setUpdateTag(e.target.value);
                }}
                value={updateTag || ""}
              />
              <button className="bg-blue-400 px-2" onClick={newUpdateTag}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap">
              {updateImage.tags.map((tag, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-row bg-blue-500 m-1 rounded-md"
                  >
                    <div className="px-2">{tag}</div>
                    <div
                      className="flex flex-row rounded-r-md px-2 bg-red-600"
                      onClick={deleteUpdateTag}
                      value={updateTag}
                    >
                      <Image
                        className="h-4 w-4 m-auto"
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
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                onClick={deleteImg}
              >
                Delete
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
              ? "relative flex flex-col justify-start p-2 w-full gap-4 h-[60svh] sm:flex-row sm:h-[40svh] md:h-[45svh] lg:h-[65svh] lg:max-w-4xl"
              : "hidden"
          }
        >
          <div className="flex flex-col items-start p-1 basis-3/6">
            <div className="pb-2">Select your image</div>
            <label
              className="w-full h-fit relative mb-1 aspect-video rounded-xl flex items-center justify-center border-[3px] border-gray-400 border-dashed cursor-pointer p-1"
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
                        new Blob(binaryData, { type: "file" })
                      )
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
                          new Blob(binaryData, { type: "file" })
                        )
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
          <div className="flex flex-col item-start text-left text-lg sm:text-sm gap-1 basis-3/6 overflow-y-auto">
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
                    className="flex flex-row bg-blue-500 m-1 rounded-md"
                  >
                    <div className="px-2">{tag}</div>
                    <div
                      className="flex flex-row rounded-r-md px-2 bg-red-600"
                      onClick={deleteTags}
                      value={tag}
                    >
                      <Image
                        className="h-4 w-4 m-auto"
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
              className=" bg-red-600 p-3 w-32 text-center rounded text-white"
            >
              {uploading ? "Uploading.." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ImageLib;
