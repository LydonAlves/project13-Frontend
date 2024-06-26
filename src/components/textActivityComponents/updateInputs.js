
export const updateInputs = (inputs, index, value) => {

  return inputs.map((input, idx) => {

    if (idx === index) {
      if (input.rule) {

        return {
          ...input,
          answer: value
        };
      } else {
        return {
          ...input,
          answer: value,
          rule: {},
          correctAnswer: false
        };
      }
    }
    return input;
  });
}
