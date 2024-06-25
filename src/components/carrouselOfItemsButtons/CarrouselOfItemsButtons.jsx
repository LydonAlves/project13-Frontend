import "./CarrouselOfItemsButtons.css"

const CarrouselOfItemsButtons = ({ items, setCurrentItemIndex, currentItemIndex }) => {
  const nextItem = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const prevItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  return (
    <div className="carrouselOfItemsButtonsDiv">
      <button
        className="primaryGreenButton"
        onClick={prevItem}
        type="button" disabled={currentItemIndex === 0}
      > &laquo; Previous
      </button>

      <button
        className="primaryGreenButton"
        onClick={nextItem} type="button"
        disabled={currentItemIndex === items.length - 1}
      >Next &raquo;
      </button>
    </div>
  )
}

export default CarrouselOfItemsButtons