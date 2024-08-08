export const chooseExerciseButtons = (finalText, exerciseType) => {
  const setUpButtons = [
    {
      id: 0,
      name: "VIDEO",
      value: "youTubeFillGap"
    },
    {
      id: 1,
      name: "FILL GAP TEXT",
      value: "fillGapText",
    },
    {
      id: 2,
      name: "GAP AND RULES",
      value: "gapAndRules",
      isActive: finalText.text !== "" ? true : false
    }
  ];

  return setUpButtons.filter(info => !(exerciseType === "fillGapText" && info.id === 0));
};
