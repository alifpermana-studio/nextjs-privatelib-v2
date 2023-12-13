import React from "react";
import Image from "next/image";
import { useState } from "react"; 
import axios from "axios";

function MainPic({ dirs }) {
  const [file, setFile] = useState();

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/images", formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          {selectedImage ? (
            <Image src={selectedImage} alt="" width={300} height={200} />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        className="bg-red-600 p-3 w-32 text-center rounded text-white"
      >
        {uploading ? "Uploading.." : "Upload"}
      </button>
    </div>
  );
}

export const getServerSideProps = async () => {
    const props = { dirs: [] }
    try {
      const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"))
      props.dirs = dirs
      return { props }
    } catch (error) {
      return { props }
    }
  }
  

export default MainPic;
