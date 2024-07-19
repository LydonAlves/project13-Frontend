export const chooseExerciseTypeButtons = (title) => [
  {
    id: 0,
    name: "Title",
    value: "title",
    isActive: true
  },
  {
    id: 1,
    name: "Fill gap text",
    value: "gapFill",
    isActive: title ? true : false
  },
  {
    id: 2,
    name: "Video",
    value: "video",
    isActive: title ? true : false
  },
  {
    id: 3,
    name: "Questions",
    value: "questions",
    isActive: title ? true : false
  },
];

