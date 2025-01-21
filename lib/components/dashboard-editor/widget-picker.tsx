'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/lib/components/ui/button';
import { WidgetType } from '@/lib/config-schema';
import { FC } from 'react';

export type WidgetPickerProps = {
  onClose?: () => void;
  onAdd?: (widget: WidgetType) => void;
}

const GROUPS: {title: string, widgets: WidgetType[]}[] = [
  { title: 'Jira', widgets: ['jira-search', 'jira-release-list'] },
  { title: 'Github', widgets: ['github-issues', 'github-branches', 'github-stats'] },
];

export const WidgetPicker: FC<WidgetPickerProps> = ({ onClose, onAdd }) => {
  return <Drawer direction={'right'} open={true}>
    <DrawerContent>
      <div className="container mx-auto">
        <DrawerHeader>
          <DrawerTitle>Add a new widget</DrawerTitle>
          <DrawerDescription>Select which widget to add the the dashboard.</DrawerDescription>
        </DrawerHeader>

        <div className="mx-auto px-4 flex flex-col gap-4">
          {GROUPS.map((group) => (
            <div key={group.title} className={'flex flex-col gap-2'}>
              <p>{group.title}</p>
              <div className={'flex flex-row flex-wrap gap-2'}>
                {group.widgets.map((widget) => (
                  <Button key={widget} onClick={() => onAdd?.(widget)}>
                    {widget}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>;
};