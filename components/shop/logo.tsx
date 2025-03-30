import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
export const Logo = () => {
    return (
        <Link href="/" className="hover:cursor-pointer">
            <div className="flex  items-center gap-x-2 hover:opacity-75 transition">
                <div className=" p-1 lg:mr-0  shrink-0 ">
                    <Image
                        src="/gymkhana1.png"
                        alt="attendease logo"
                        height="40"
                        width="40" />
                </div>
                <div className={cn(" lg:flex flex-col items-center justify-center ",
                    font.className
                )}><p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                        Gymkhana</p>
                </div>
            </div>
        </Link>
    )
}