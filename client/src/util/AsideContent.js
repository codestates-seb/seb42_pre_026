import { MdEdit } from 'react-icons/md';
import { BsStackOverflow } from 'react-icons/bs';
import { BiMessage } from 'react-icons/bi';
import amazon from './svg/aws.svg';
import googleCloud from './svg/googleCloud.svg';
import wso2 from './svg/wso2.svg';

export const OVERVIEW_BLOG = [
  {
    icon: <MdEdit />,
    content: 'Authorization on Rails (Ep. 540)',
  },
  {
    icon: <MdEdit />,
    content: 'Shorten the distance between production data and insight (Ep. 541) sponsored post',
  },
];

export const FEATURED_ON_META = [
  {
    icon: <BiMessage />,
    content: 'Ticket smash for [status-review] tag: Part Deux',
  },
  {
    icon: <BiMessage />,
    content: `We've added a "Necessary cookies only" option to the cookie consent popup`,
  },
  {
    icon: (
      <BsStackOverflow width={16} height={16} fill1="hsl(210,8%,35%)" fill2="hsl(210,8%,60%)" />
    ),
    content: `We’ve made changes to our Privacy Notice for Collectives™`,
  },
  {
    icon: (
      <BsStackOverflow width={16} height={16} fill1="hsl(210,8%,35%)" fill2="hsl(210,8%,60%)" />
    ),
    content: 'The [amazon] tag is being burninated',
  },
  {
    icon: (
      <BsStackOverflow width={16} height={16} fill1="hsl(210,8%,35%)" fill2="hsl(210,8%,60%)" />
    ),
    content: 'Microsoft Azure Collective launch and proposed tag changes',
  },
  {
    icon: (
      <BsStackOverflow width={16} height={16} fill1="hsl(210,8%,35%)" fill2="hsl(210,8%,60%)" />
    ),
    content: 'Temporary policy: ChatGPT is banned',
  },
];

export const COLLECTIVE_DETAILS = [
  {
    title: 'Google Cloud',
    members: '37k Members',
    desc: 'Google Cloud provides organizations with leading infrastructure, platform capabilities...',
    icon: googleCloud,
  },
  {
    title: 'AWS',
    members: '7k Members',
    desc: 'Amazon Web Services (AWS) is the world’s most comprehensive and broadly adopted...',
    icon: amazon,
  },
  {
    title: 'WSO2',
    members: '4k Members',
    desc: 'WSO2 solutions give enterprises the flexibility to deploy applications and...',
    icon: wso2,
  },
];
