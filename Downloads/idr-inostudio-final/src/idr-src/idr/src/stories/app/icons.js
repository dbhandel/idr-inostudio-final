import React from 'react';
import { storiesOf } from '@kadira/storybook';

/* icons */
import CalendarIcon from 'views/icons/calendar';
import CameraIcon from 'views/icons/camera';
import CreateIcon from 'views/icons/create';
import DocsIcon from 'views/icons/docs';
import EyeIcon from 'views/icons/eye';
import LeafIcon from 'views/icons/leaf';
import LinkIcon from 'views/icons/link';
import MagnifyIcon from 'views/icons/magnify';
import MenuIcon from 'views/icons/menu';
import ProfileIcon from 'views/icons/profile';
import ProgressIcon from 'views/icons/progress';
import RocketIcon from 'views/icons/rocket';
import SortDownIcon from 'views/icons/sort-down';
import SortUpIcon from 'views/icons/sort-up';
import StarIcon from 'views/icons/star';
import TagIcon from 'views/icons/tag';
import TrashIcon from 'views/icons/trash';
import XIcon from 'views/icons/x';
import Upload from 'views/icons/upload';
import Inbox from 'views/icons/inbox';

/* icon holder */
const Icon = element => (
  <div style={{ width: 100, height: 100 }} >{element()}</div>
);

Icon.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default {
  stories: [
    {
      name: 'Calendar',
      component: <CalendarIcon />,
    },
    {
      name: 'Camera',
      component: <CameraIcon />,
    },
    {
      name: 'Create',
      component: <CreateIcon />,
    },
    {
      name: 'Docs',
      component: <DocsIcon />,
    },
    {
      name: 'Eye',
      component: <EyeIcon />,
    },

    {
      name: 'Leaf',
      component: <LeafIcon />,
    },
    {
      name: 'Link',
      component: <LinkIcon />,
    },
    {
      name: 'Magnify',
      component: <MagnifyIcon />,
    },
    {
      name: 'Menu',
      component: <MenuIcon />,
    },
    {
      name: 'Profile',
      component: <ProfileIcon />,
    },
    {
      name: 'Progress',
      component: <ProgressIcon />,
    },
    {
      name: 'Rocket',
      component: <RocketIcon />,
    },
    {
      name: 'Sort Down',
      component: <SortDownIcon />,
    },
    {
      name: 'Sort Up',
      component: <SortUpIcon />,
    },
    {
      name: 'Star',
      component: <StarIcon />,
    },
    {
      name: 'Tag',
      component: <TagIcon />,
    },
    {
      name: 'Trash',
      component: <TrashIcon />,
    },
    {
      name: 'X',
      component: <XIcon />,
    },
    {
      name: 'Upload',
      component: <Upload />,
    },
    {
      name: 'Inbox',
      component: <Inbox />,
    },
  ],

  loader: storiesOf('Icons', module).addDecorator(Icon),
};
