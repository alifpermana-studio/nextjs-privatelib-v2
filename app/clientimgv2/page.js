'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'

export default function UploadForm() {
    const [popUp, setPopUp] = useState(false)
    const [image, setImage] = useState([])
    const [reload, setReload] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const [selectedFile, setSelectedFile] = useState()
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

    const openPopUp = () => {
        setPopUp(true)
    }

    const closePopUp = () => {
        setPopUp(false)
    }

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

            console.log(resPost);
            
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
        <div className='relative'>
            <Navbar />
            <div className={(popUp) ? " flex flex-col fixed bg-red-900 items-center w-screen" : "hidden"}>
                <div className=' absolute opacity-60 bg-gray-500 w-screen h-screen'>

                </div>
                <div className='absolute pt-20'>
                    <div className='dark:bg-darkmode bg-white w-[1300px] h-[500px] p-2'>
                        <div className='flex flex-row justify-center divide-x-2'>
                            <div className='flex flex-col basis-2/3  p-1 m-2'>
                                <div className='text-3xl'>
                                    Your Collection
                                </div>
                                <div className='flex flex-row items-center p-0 m-0 flex-wrap justify-center overflow-y-auto  w-[870px] h-[400px]'>
                                    {image.map((total, i) => (
                                        <div key={i} className='bg-white m-2'>
                                            <Image className='h-48 w-48 object-contain' src={"/images/" + total} alt={total} width={200} height={100} />
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col basis-1/3  p-1 pl-3 m-2'>
                                <div className='text-3xl'>
                                    Upload Image
                                </div>
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
                                    <div className="relative w-80 h-72 aspect-video rounded-xl flex items-center justify-center border-2 border-dashed cursor-pointer p-1">
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
                        </div>
                        <button className="relative" onClick={closePopUp}>Close</button>
                    </div>
                </div>
            </div>

            <div className='bg-green-400'>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
            </div>

            <button className="relative" onClick={openPopUp}>Open</button>


            <div className='bg-green-400'>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
                <p>Muncul lagi</p>
            </div>
        </div>
    )
}



