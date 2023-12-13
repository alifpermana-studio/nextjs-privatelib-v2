'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { join } from 'path'
import path from 'path'

export default function UploadForm() {
  const [file, setFile] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [selectedFile, setSelectedFile] = useState()
  const [reload, setReload] = useState()
  const [image, setImage] = useState([])

  const [uploading, setUploading] = useState(false)


  useEffect(() => {
    let loadImg = true
    setReload(false)

    const getImage = async () => {
      const resGet = await fetch('/api/images', {
        method: 'GET',
      })
      const { hasilku } = await resGet.json()

      if (loadImg) {
        setImage(hasilku)
        /* console.log(oneImg); */
      }
    }

    getImage().catch(console.error)

    return () => loadImg = false
  }, [reload])

  const onSubmit = async (e) => {
    setUploading(true)
    e.preventDefault()
    if (!selectedFile) return

    try {
      const data = new FormData()
      data.set('file', selectedFile)

      const resPost = await fetch('/api/images', {
        method: 'POST',
        body: data
      })

      /* const { hasilku } = await resPost.json() */
      /* console.log(hasilku); */

      // handle the error
      if (!resPost.ok) throw new Error(await resPost.text())
      setReload(true)
    } catch (err) {
      // Handle errors here
      console.error(err)
    }

    setUploading(false)
  }

  return (
    <>
      <h1 className='flex text-2xl justify-center'>Show your Goddess</h1>
      {/* <form onSubmit={onSubmit} className='flex flex-col w-full text-yellow-950 item-center justify-center'>
        <input
          type="file"
          name="file"
          hidden
          onChange={(e) => {
            setFile(e.target.files?.[0]);
            setSelectedImage(URL.createObjectURL(e.target.files?.[0]))
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          {file ? (
            <Image src={selectedImage} alt="" width={300} height={200} />
          ) : (
            <span className='text-white'>Select Image</span>
          )}
        </div>
        <input className="text-white" type="submit" value="Upload" />
      </form> */}
      <div className='flex flex-col items-center'>
        <label>
          <input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files?.[0]
                var binaryData = [];
                binaryData.push(file);
                if (file) {
                  setSelectedImage(URL.createObjectURL(new Blob(binaryData, { type: "file" })))
                }
                setSelectedFile(file)
                console.log(file);
              }
            }}
          />
          <div className="relative w-[800px] h-[400px] aspect-video rounded-xl flex items-center justify-center border-2 border-dashed cursor-pointer p-1">
            {selectedImage ? (
              <Image src={selectedImage} alt="" fill={true} style={{ objectFit: "contain" }} />
            ) : (
              <span>Select Image</span>
            )}
          </div>
        </label>
        <button
          onClick={onSubmit}
          disabled={uploading}
          style={{ opacity: uploading ? ".5" : "1" }}
          className=" bg-red-600 p-3 w-32 text-center rounded text-white"
        >
          {uploading ? "Uploading.." : "Upload"}
        </button>
      </div>

      <div className='flex justify-center'>

      </div>

      <div className='flex flex-row items-center flex-wrap justify-center'>
        {image.map((total, i) => (
          <div key={i} className=' bg-white my-3 mx-2'>
            <Image src={"/images/" + total} alt={total} width={200} height={200} className='' />
          </div>

        ))}
      </div>
    </>
  )
}



