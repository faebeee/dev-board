'use client';
import { Carousel, CarouselContent, CarouselItem } from '@/lib/components/ui/carousel';
import { WidgetMounter } from '@/lib/components/widget-mounter';
import { Widget } from '@/lib/types/widget';
import Autoplay from 'embla-carousel-autoplay';
import { FC } from 'react';


export const WidgetCarousel: FC<{widgets: Widget[], dashboardId: string}> = ({ widgets, dashboardId }) => {
  return <Carousel opts={{
    loop: true,
  }}
    plugins={[
      Autoplay({
        delay: 10_000,
      }),
    ]}>
    <CarouselContent>
      {widgets.map((widget) => {
        return <CarouselItem className="basis-1/3" key={widget.id}>
          <WidgetMounter widget={widget} dashboard={dashboardId} key={widget.id}/>
        </CarouselItem>;
      })}
    </CarouselContent>
  </Carousel>;
};