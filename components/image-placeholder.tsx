import { cn } from "@/lib/utils"

interface ImagePlaceholderProps {
  description: string
  aspectRatio?: "video" | "square" | "4/3" | "3/4" | "16/9" | "9/16"
  className?: string
}

export function ImagePlaceholder({
  description,
  aspectRatio = "video",
  className,
}: ImagePlaceholderProps) {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "16/9": "aspect-[16/9]",
    "9/16": "aspect-[9/16]",
  }[aspectRatio]

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-muted to-muted/80 rounded-lg flex items-center justify-center text-muted-foreground",
        aspectClass,
        className
      )}
    >
      <span className="text-sm text-center px-4">{description}</span>
    </div>
  )
}
