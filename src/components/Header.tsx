
// import React from 'react';
// import Image from 'next/image';

// const Header = () => {

//     const date = new Date().toLocaleDateString("bn-BD", {
//         dateStyle: "full"
//     });

//     return (
//         <header className='container max-w-2xl mx-auto'>

//             <div className='flex items-center justify-between'>
//                 <div className='flex items-center gap-3'>
//                     <Image

//                         className='w-10 h-10' height={60} width={60} src={'/logo-icon.png'} alt=''


//                     />
//                     <div >
//                         <h2>বাজার দর</h2>
//                         <p> {date} </p>
//                     </div>

//                 </div>
//                     <div className='absolute right-4 top-4 mr-25'>
//                         <button className="btn btn-primary mr-1">সাইন ইন</button>
//                         <button className="btn btn-primary">সাইন আপ</button>
//                     </div>
//             </div>

//         </header>
//     );
// };

// export default Header;

// import React from 'react';
// import Image from 'next/image';
// import Navlinks from './Navlinks';

// const Header = () => {

//     const date = new Date().toLocaleDateString("bn-BD", {
//         dateStyle: "full"
//     });

//     return (
//         <header className="border-b border-gray-200 bg-white">

//             <div className="container mx-auto flex h-16 max-w-2xl items-center justify-between px-4">

//                 {/* Left Side */}
//                 <div className="flex items-center gap-2">

//                     <Image
//                         className="h-8 w-8"
//                         height={32}
//                         width={32}
//                         src="/logo-icon.png"
//                         alt="বাজার দর"
//                     />

//                     <div>
//                         <h2 className="text-base font-bold leading-tight">
//                             বাজার দর
//                         </h2>

//                         <p className="text-[10px] text-gray-500 font-bold">
//                             {date}
//                         </p>
//                     </div>

//                 </div>


//                 {/* Right Side */}
//                 <div className="flex items-center gap-4">

//                     <button className="btn btn-active">সাইন ইন</button>

//                     <button className="btn btn-primary btn-sm">
//                         সাইন আপ
//                     </button>

//                 </div>

//             </div>
//             <Navlinks/>

//         </header>
//     );
// };

// export default Header;

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import PriceTicker from "./priceTicker";
// import ProfileMenu from "@/components/ProfileMenu";
// import HeaderAuth from "@/components/HeaderAuth";



// interface Category {
//     id: string;
//     slug: string;
//     nameBn: string;
//     icon: string;
// }

// const Header = async () => {

//     const date = new Date().toLocaleDateString("bn-BD", {
//         dateStyle: "full",
//     });



    
//     const res = await fetch(
//         "https://openapi.programming-hero.com/api/bazardor/categories",

//         // https://api.api-store.workers.dev/api/bazardor/categories
        
//         {
//             cache: "no-store",
//         }
//     );

//     if (!res.ok) {
//         throw new Error("Failed to fetch categories");
//     }

//     const categories: Category[] = await res.json();

//     return (
//         <>
//         <header className="border-b border-gray-200 bg-white">

//            <div className="mx-auto max-w-4xl items-center  px-5 py-6 sm:px-8 md:grid-cols-2 md:px-10 md:py-2">
        

//                 {/* Top Header */}
//                 <div className="flex h-12 items-center justify-between">

//                     {/* Logo + Website Name */}
//                     <div className="flex items-center gap-3">

//                         <Image
//                             className="h-8 w-8"
//                             height={30}
//                             width={30}
//                             src="/logo-icon.png"
//                             alt="বাজার দর"
//                         />

//                         <div>
//                             <h2 className="text-2xl font-bold leading-tight">
//                                 বাজার দর
//                             </h2>

//                             <p className="text-[11px] text-gray-500">
//                                 {date}
//                             </p>

  


//                         </div>

//                     </div>

//                     {/* Right Side */}
//                     <div className="flex items-center gap-3">

//                         <div className="flex items-center gap-3">
//   <HeaderAuth />
// </div>

//                     </div>

                    

//                 </div>


//                 {/* Category Navigation */}
//                 <nav className="flex h-9 items-center gap-5 overflow-x-auto border-t border-gray-100">

//                     {categories.map((category) => (
//                         <Link
//                             key={category.id}
//                             href={`/category/${category.slug}`}
//                             className="flex shrink-0 items-center gap-1 text-[10px] text-gray-700 hover:text-green-600"
//                         >
//                             <span>{category.icon}</span>

//                             <span>{category.nameBn}</span>
//                         </Link>
//                     ))}

//                 </nav>

//             </div>

//         </header>
//          <PriceTicker />
//          </>
//        );

       
// };

// export default Header;



import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import CategoryNavigation from "@/components/CategoryNavigation";

import PriceTicker from "./priceTicker";
import HeaderAuth from "@/components/HeaderAuth";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Header = async () => {
    // বর্তমান তারিখ request-এর সময় নির্ধারণ করবে
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    // API থেকে ক্যাটাগরি সংগ্রহ
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    const categories: Category[] = await res.json();

    return (
        <>
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-5 py-4 sm:px-8 md:px-10 md:py-3">

                    {/* Top Header */}
                    <div className="flex min-h-12 items-center justify-between gap-3">

                        {/* Logo and Website Name */}
                        <Link
                            href="/"
                            className="flex min-w-0 items-center gap-3"
                            aria-label="বাজার দর হোম পেজ"
                        >
                            <Image
                                className="h-8 w-8 shrink-0 object-contain"
                                height={32}
                                width={32}
                                src="/logo-icon.png"
                                alt="বাজার দর"
                                priority
                            />

                            <div className="min-w-0">
                                <h2 className="text-xl font-bold leading-tight text-[#27332b] sm:text-2xl">
                                    বাজার দর
                                </h2>

                                <p className="mt-1 text-[11px] text-gray-500">
                                    {date}
                                </p>
                            </div>
                        </Link>

                        {/* Authentication */}
                        <div className="flex shrink-0 items-center gap-3">
                            <HeaderAuth />
                        </div>
                    </div>

                    
                    <CategoryNavigation categories={categories} />
                </div>
            </header>

            {/* Product Price Ticker */}
            <PriceTicker />
        </>
    );
};

export default Header;
