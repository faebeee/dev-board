import {FC} from "react"
import {Avatar as AvatarComp, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const Avatar: FC<{ src?: string, name?: string, className?: string }> = ({name, src, className,}) => {
  return <AvatarComp className={className}>
    {src && <AvatarImage src={src}/>}
    {name && <AvatarFallback>{name}</AvatarFallback>}
  </AvatarComp>
}