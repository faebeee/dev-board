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

export const WidgetPicker: FC<WidgetPickerProps> = ({ onClose, onAdd }) => {
  return <Drawer direction={'right'} open={true}>
    <DrawerContent>
      <div className="container mx-auto">
        <DrawerHeader>
          <DrawerTitle>Add a new widget</DrawerTitle>
          <DrawerDescription>Select which widget to add the the dashboard.</DrawerDescription>
        </DrawerHeader>

        <div className="mx-auto px-4 flex flex-col gap-4">
          <div className={'flex flex-col gap-2'}>
            <p>Jira</p>
            <div className={'flex flex-row flex-wrap gap-2'}>
              <Button onClick={() => onAdd?.('jira-search')}>
                JQL Result
              </Button>

              <Button onClick={() => onAdd?.('jira-release-list')}>
                Release List
              </Button>
            </div>
          </div>

          <div className={'flex flex-col gap-2'}>
            <p>Github</p>
            <div className={'flex flex-row flex-wrap gap-2'}>
              <Button onClick={() => onAdd?.('github-issues')}>
                Issue List
              </Button>
            </div>
          </div>
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