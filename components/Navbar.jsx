import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
  <nav className='w-full bg-violet-600 text-white h-[75px]'>
      <div className="container max-w-screen-2xl mx-auto p-4 flex h-full justify-between items-center">
<div className=" flex relative items-center justify-center h-full">
          <Link href="/">
            <Image className="object-contain " src="/navLogo.png" width={150} height={100} alt="PopCorn Picks"/>
          </Link>
      </div>
      <div className="github  " >
        <Link className='flex items-center justify-center gap-1 bg-yellow-50 rounded-md  p-2 text-black' href={'https://github.com/yash2895' } target='_blank'>
          <Image width={20} height={20} src="/github.png" alt="GITHUB"/>
          <span>Github</span>
        </Link>
      </div>
</div>
    </nav>
  )
}

export default Navbar
