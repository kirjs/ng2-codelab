import {VideoItem} from "./VideoItem";

let FAKE_VIDEOS = [
  {
    title: "Cute kitten",
    src: "/assets/images/kitten1.jpg"
  },
  {
    title: "Kitten on the tree",
    src: "/assets/images/kitten2.jpg"
  }, {
    title: "More kitten",
    src: "/assets/images/kitten2.jpg"
  }, {
    title: "Another kitten",
    src: "/assets/images/kitten2.jpg"
  },
  {
    title: "Serouis cat",
    src: "/assets/images/kitten2.jpg"
  },
];

export const Api = {
  fetch(searchString: string): Array<VideoItem> {
    return FAKE_VIDEOS.filter((video) =>
      video.title.indexOf(searchString) >= 0
    );
  }
};
