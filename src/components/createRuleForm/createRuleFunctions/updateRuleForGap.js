
export const assignRuleToGap = (item, id, updateInputToFill) => {

  updateInputToFill(prev => {
    const index = prev.findIndex(input => input.id === id);
    if (index === -1) {
      console.error(`No item found with id: ${id}`);
      return prev;
    }

    const updatedInputs = [...prev];
    updatedInputs[index] = { ...prev[index], rule: item };

    return updatedInputs;
  });
} 