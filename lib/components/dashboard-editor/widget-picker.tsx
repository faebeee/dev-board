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
import { SiJira } from '@icons-pack/react-simple-icons';
import { FC } from 'react';

export type WidgetPickerProps = {
  onClose?: () => void;
  onAdd?: (widget: WidgetType) => void;
}

export const WidgetPicker: FC<WidgetPickerProps> = ({ onClose, onAdd }) => {
  return <Drawer direction={'right'} open={true}>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>

      <div>
        <Button onClick={() => onAdd?.('jira-search')}>
          <SiJira/>
          Jira Search
        </Button>
      </div>

      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>;
};