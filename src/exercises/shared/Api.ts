import {VideoItem} from "./VideoItem";

let FAKE_VIDEOS = [
  {
    title: "Cute kitten",
    src: "/assets/images/kitten1.jpg",
    description: "todo",
    views: 100,
    likes: 20
  },
  {
    title: "Kitten on the tree",
    src: "/assets/images/kitten2.jpg",
    description: "todo",
    views: 100,
    likes: 20
  }, {
    title: "More kitten",
    src: "/assets/images/kitten2.jpg",
    description: "todo",
    views: 100,
    likes: 20
  }, {
    title: "Another kitten",
    src: "/assets/images/kitten2.jpg",
    description: "todo",
    views: 100,
    likes: 20
  },
  {
    title: "Serouis cat",
    src: "/assets/images/kitten2.jpg",
    description: "todo",
    views: 100,
    likes: 20
  },
];

export const Api = {
  fetch(searchString: string): Array<VideoItem> {
    return FAKE_VIDEOS.filter((video) =>
      video.title.indexOf(searchString) >= 0
    );
  }
};
