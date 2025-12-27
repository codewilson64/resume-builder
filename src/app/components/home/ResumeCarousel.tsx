import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image"
import orion_black from "../../../../public/cv_orion_black.png"
import orion_green from "../../../../public/cv_orion_green.png"
import orion_red from "../../../../public/cv_orion_red.png"

const resumeTemplates = [
    {
      id: "orion-black",
      src: orion_black,
      name: "Orion Black",
    },
    {
      id: "orion-green",
      src: orion_green,
      name: "Orion Green",
    },
    {
      id: "orion-red",
      src: orion_red,
      name: "Orion Red",
    },
  ]
  

  export function ResumeCarousel() {
    return (
    <div className="px-6 py-20">
      <h1 className="text-3xl md:text-6xl font-bold text-center leading-tight md:leading-snug text-gray-900">
        Pick a template and build your resume!
      </h1>
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {resumeTemplates.map((template, index) => (
            <CarouselItem
              key={template.id}
              className="w-full flex justify-center p-5"
            >
              <Card className="w-[360px] rounded-xl p-5 overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100">
                <CardContent className="relative h-[360px]">
                  <Image
                    src={template.src}
                    alt={`${template.name} resume preview`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
  
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div> 
    )
  }
  
