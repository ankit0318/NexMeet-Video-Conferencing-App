import { ICONS } from "../public/icons";
import { AVATAR_IMAGES } from "../public/images";

export const sidebarLinks = [
  {
    imgURL: ICONS.HOME,
    route: "/",
    label: "Home",
  },

  {
    imgURL: ICONS.UPCOMING,
    route: "/upcoming",
    label: "Upcoming",
  },
  {
    imgURL: ICONS.PREVIOUS,
    route: "/previous",
    label: "Previous",
  },
  {
    imgURL: ICONS.VIDEO,
    route: "/recordings",
    label: "Recordings",
  },
  {
    imgURL: ICONS.ADD_PERSONAL,
    route: "/personal-room",
    label: "Personal Room",
  },
];

export const avatarImages = AVATAR_IMAGES;
