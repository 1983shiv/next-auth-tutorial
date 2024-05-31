import { Poppins } from "next/font/google"
import { cn } from "@lib/utils"

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

interface HeaderAuthProps {
    label: string;
}

export const HeaderAuth = ({ label} : HeaderAuthProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-y-4 items-center justify-center")}>
        <h1 className={cn("text-3xl font-semibold", font)}>HeaderAuth</h1>
        <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}
