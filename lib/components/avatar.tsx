import {FC} from "react"
import {Avatar as AvatarComp, AvatarFallback, AvatarImage} from "@/lib/components/ui/avatar";

export const Avatar: FC<{ src?: string, name?: string, className?: string }> = ({name, src, className,}) => {
  return <AvatarComp className={className}>
    {src && <AvatarImage src={src}/>}
    {name && <AvatarFallback className={'text-gray-800 font-light'}>{name}</AvatarFallback>}
  </AvatarComp>
}