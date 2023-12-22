'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'
import LoremIpsum from '@/component/LoremIpsum'

export default function UploadForm() {
    const [popUp, setPopUp] = useState(false)
    const [image, setImage] = useState([])
    const [reload, setReload] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const [selectedFile, setSelectedFile] = useState("empty")
    const [uploading, setUploading] = useState(false)
    const [imgSubmit, setImgSubmit] = useState()

    useEffect(() => {
        let loadImg = true
        setReload(false)

        const getImage = async () => {
            const resGet = await fetch('/api/images', {
                method: 'GET',
            })
            const { result } = await resGet.json()

            if (loadImg) {
                setImage(result)
                console.log(result);
            }
        }

        setTimeout(() => {
            getImage().catch(console.error)
        }, 3000)


        return () => loadImg = false
    }, [reload])

    const openPopUp = () => {
        setPopUp(true)
    }

    const closePopUp = () => {
        setPopUp(false)
    }

    const onUpload = async (e) => {
        setUploading(true)
        e.preventDefault()
        if (!selectedFile) return

        try {
            const resPost = await fetch('/api/imagekit', {
                method: 'POST',
                body: JSON.stringify(selectedFile),
            })

            const { success } = await resPost.json()
            console.log(success);

            // handle the error
            if (!resPost.ok) {
                throw new Error(await resPost.text())
            }
            setReload(true)
        } catch (err) {
            // Handle errors here
            console.error(err)
        }

        setReload(true)
        setUploading(false)
        setSelectedImage()
    }

    const handleSubmit = () => {
        console.log(imgSubmit);
    }

    return (
        <div className='relative'>
            <Navbar />
            <div className={(popUp) ? "z-10 flex flex-col fixed bg-red-900 items-center w-screen" : "hidden"}>
                <div className=' absolute opacity-60 bg-gray-500 w-screen h-screen'>
                </div>
                <div className='absolute pt-6'>
                    <div className='dark:bg-darkmode bg-white w-[1300px] h-[520px] p-2'>
                        <div className='flex flex-row justify-center divide-x-2'>
                            <div className='flex flex-col basis-2/3 p-2'>
                                <div className='text-2xl'>
                                    Your Collection
                                </div>
                                <div className='flex flex-row p-0 m-0 flex-wrap justify-start content-start overflow-y-auto  w-[880px] h-[400px]'>
                                    {image.map((image, i) => (
                                        <button key={i} className='border border-cyan-500 m-1 focus:bg-slate-50 focus:ring' onClick={() => setImgSubmit(image.fileName)}>
                                            <Image className='h-40 w-40 object-contain' src={"https://ik.imagekit.io/alifpermanastudio/" + image.fileName} alt={image.fileName} width={200} height={100} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col basis-1/3  p-1 pl-3 m-2'>
                                <div className='text-2xl'>
                                    Upload Image
                                </div>
                                <label className='w-40 relative h-40 mb-1 aspect-video rounded-xl flex items-center justify-center border-[3px] border-gray-400 border-dashed cursor-pointer p-1'>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={({ target }) => {
                                            if (target.files) {
                                                const file = target.files?.[0]
                                                var binaryData = [];
                                                binaryData.push(file);
                                                const reader = new FileReader();
                                                if (file) {
                                                    reader.readAsDataURL(file)
                                                    reader.onloadend = () => {
                                                        setSelectedFile(reader.result)
                                                    }
                                                }
                                                if (file) {
                                                    setSelectedImage(URL.createObjectURL(new Blob(binaryData, { type: "file" })))
                                                }
                                                /* console.log(file); */
                                            }
                                        }}
                                    />

                                    <div className="">
                                        {selectedImage ? (
                                            <Image src={selectedImage} alt="" fill={true} style={{ objectFit: "contain" }} />
                                        ) : (
                                            <span>Select Image</span>
                                        )}
                                    </div>
                                </label>

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
                        <div className='flex flex-row content-center justify-center p-2'>
                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={closePopUp}>Cancel</button>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-16 text-center text-lg p-8'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta at neque nec feugiat. Suspendisse volutpat in sem a congue. Pellentesque non sodales ipsum. Maecenas pharetra et augue quis sodales. Nam dictum velit vitae nisl pharetra, vitae rutrum lectus dictum. Duis ut varius odio. Fusce vel tempus lectus, vitae tempor magna. Aenean ut malesuada dolor, sed tristique est. Nunc id erat ut metus lacinia placerat non sed libero.</p>
                <p>Vestibulum sed congue leo, in bibendum leo. Donec elementum consequat ipsum, eu finibus dui interdum eu. Fusce molestie nisi lorem, malesuada commodo est scelerisque ut. Donec ut enim lorem. Duis ut risus dolor. Sed ante nibh, sollicitudin ornare risus a, dapibus lacinia sapien. Maecenas luctus placerat enim at tempor. Proin sed nulla ac nibh congue ornare.</p>
                <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam hendrerit condimentum orci, sit amet feugiat orci iaculis sit amet. Mauris laoreet quam ac augue sollicitudin, at vulputate urna efficitur. Maecenas vel cursus elit. Aliquam varius metus eu egestas hendrerit. Vestibulum viverra luctus viverra. Suspendisse blandit hendrerit neque nec pellentesque.</p>
                <p>Suspendisse tempus nunc lorem, eu commodo nunc tincidunt vel. Suspendisse et ex nec orci malesuada placerat. Praesent quis mollis tortor, vitae commodo tellus. Cras et nibh diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras suscipit sapien eget volutpat maximus. Integer vel augue tempor, facilisis enim vel, viverra mauris. Maecenas bibendum metus sit amet faucibus facilisis. Donec malesuada nisi sed orci volutpat auctor eget vel tellus.</p>
                <p>Morbi suscipit urna nec nulla rhoncus maximus. Pellentesque tempus augue nec hendrerit pharetra. Donec sed augue consequat, gravida felis semper, congue urna. Proin sagittis, orci et commodo pretium, ligula lorem faucibus ligula, feugiat imperdiet lacus diam ac tortor. Morbi euismod sapien libero, id luctus sapien porta vitae. Mauris sed aliquet mauris, vitae facilisis purus. In mollis nisl non eleifend hendrerit. Mauris elementum elit nec massa vestibulum dictum. Maecenas accumsan elementum elit. Maecenas et orci a ligula ultricies facilisis. Maecenas luctus tortor hendrerit, posuere urna sed, tincidunt dolor. In sit amet tortor a nisi lacinia elementum vitae ac lorem. Sed dictum malesuada imperdiet. Proin eu egestas nunc. Curabitur aliquam ornare mauris in faucibus.</p>
                <p>Mauris augue felis, faucibus non mauris at, bibendum pretium turpis. Vestibulum ante metus, pharetra eget sapien vel, eleifend mattis lacus. Integer quis molestie mauris, et bibendum dui. Fusce nec iaculis est, ut convallis turpis. Praesent at pretium tortor. Vivamus accumsan mauris non orci sagittis, scelerisque iaculis dolor placerat. Duis non sapien iaculis, rhoncus arcu sed, convallis dui. Ut ut viverra odio, a rutrum lectus. Curabitur facilisis sollicitudin nulla, non fringilla lorem scelerisque venenatis. Fusce fermentum ligula convallis, condimentum erat non, mollis est. Ut id dolor lectus. Sed in dignissim ante. Nunc sed tempus nisi. Pellentesque a erat a velit laoreet convallis quis ut leo.</p>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse semper suscipit pellentesque. In vel nisi velit. Aliquam vitae nibh a nulla aliquet hendrerit. Integer tempus urna at tellus malesuada, at vestibulum elit maximus. Sed vitae neque dolor. Quisque sagittis quam augue, a sodales nisl ullamcorper eu. Maecenas tincidunt sed quam eget auctor. Ut orci nisl, vulputate ac pulvinar vitae, euismod sit amet odio. In hac habitasse platea dictumst. Mauris dapibus vulputate viverra. Donec quis ante lorem. In nec molestie nunc. Aenean ipsum libero, luctus quis urna non, tincidunt condimentum leo. Donec ac rutrum mi, et feugiat massa.</p>
            </div>

            <button className="absolute" onClick={openPopUp}>Open</button>

            <div className='flex flex-col gap-4 mt-24 text-center text-lg p-8'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta at neque nec feugiat. Suspendisse volutpat in sem a congue. Pellentesque non sodales ipsum. Maecenas pharetra et augue quis sodales. Nam dictum velit vitae nisl pharetra, vitae rutrum lectus dictum. Duis ut varius odio. Fusce vel tempus lectus, vitae tempor magna. Aenean ut malesuada dolor, sed tristique est. Nunc id erat ut metus lacinia placerat non sed libero.</p>
                <p>Vestibulum sed congue leo, in bibendum leo. Donec elementum consequat ipsum, eu finibus dui interdum eu. Fusce molestie nisi lorem, malesuada commodo est scelerisque ut. Donec ut enim lorem. Duis ut risus dolor. Sed ante nibh, sollicitudin ornare risus a, dapibus lacinia sapien. Maecenas luctus placerat enim at tempor. Proin sed nulla ac nibh congue ornare.</p>
                <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam hendrerit condimentum orci, sit amet feugiat orci iaculis sit amet. Mauris laoreet quam ac augue sollicitudin, at vulputate urna efficitur. Maecenas vel cursus elit. Aliquam varius metus eu egestas hendrerit. Vestibulum viverra luctus viverra. Suspendisse blandit hendrerit neque nec pellentesque.</p>
                <p>Suspendisse tempus nunc lorem, eu commodo nunc tincidunt vel. Suspendisse et ex nec orci malesuada placerat. Praesent quis mollis tortor, vitae commodo tellus. Cras et nibh diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras suscipit sapien eget volutpat maximus. Integer vel augue tempor, facilisis enim vel, viverra mauris. Maecenas bibendum metus sit amet faucibus facilisis. Donec malesuada nisi sed orci volutpat auctor eget vel tellus.</p>
                <p>Morbi suscipit urna nec nulla rhoncus maximus. Pellentesque tempus augue nec hendrerit pharetra. Donec sed augue consequat, gravida felis semper, congue urna. Proin sagittis, orci et commodo pretium, ligula lorem faucibus ligula, feugiat imperdiet lacus diam ac tortor. Morbi euismod sapien libero, id luctus sapien porta vitae. Mauris sed aliquet mauris, vitae facilisis purus. In mollis nisl non eleifend hendrerit. Mauris elementum elit nec massa vestibulum dictum. Maecenas accumsan elementum elit. Maecenas et orci a ligula ultricies facilisis. Maecenas luctus tortor hendrerit, posuere urna sed, tincidunt dolor. In sit amet tortor a nisi lacinia elementum vitae ac lorem. Sed dictum malesuada imperdiet. Proin eu egestas nunc. Curabitur aliquam ornare mauris in faucibus.</p>
                <p>Mauris augue felis, faucibus non mauris at, bibendum pretium turpis. Vestibulum ante metus, pharetra eget sapien vel, eleifend mattis lacus. Integer quis molestie mauris, et bibendum dui. Fusce nec iaculis est, ut convallis turpis. Praesent at pretium tortor. Vivamus accumsan mauris non orci sagittis, scelerisque iaculis dolor placerat. Duis non sapien iaculis, rhoncus arcu sed, convallis dui. Ut ut viverra odio, a rutrum lectus. Curabitur facilisis sollicitudin nulla, non fringilla lorem scelerisque venenatis. Fusce fermentum ligula convallis, condimentum erat non, mollis est. Ut id dolor lectus. Sed in dignissim ante. Nunc sed tempus nisi. Pellentesque a erat a velit laoreet convallis quis ut leo.</p>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse semper suscipit pellentesque. In vel nisi velit. Aliquam vitae nibh a nulla aliquet hendrerit. Integer tempus urna at tellus malesuada, at vestibulum elit maximus. Sed vitae neque dolor. Quisque sagittis quam augue, a sodales nisl ullamcorper eu. Maecenas tincidunt sed quam eget auctor. Ut orci nisl, vulputate ac pulvinar vitae, euismod sit amet odio. In hac habitasse platea dictumst. Mauris dapibus vulputate viverra. Donec quis ante lorem. In nec molestie nunc. Aenean ipsum libero, luctus quis urna non, tincidunt condimentum leo. Donec ac rutrum mi, et feugiat massa.</p>
            </div>
        </div>
    )
}



