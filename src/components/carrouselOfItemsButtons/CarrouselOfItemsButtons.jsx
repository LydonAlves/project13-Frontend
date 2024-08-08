import "./CarrouselOfItemsButtons.css"

const CarrouselOfItemsButtons = ({
  items,
  dispatch,
  currentItemIndex
}) => {

  const nextItem = () => {
    if (currentItemIndex < items.length - 1) {
      dispatch({ type: 'INCREMENT_INDEX' });
    }
  };

  const prevItem = () => {
    if (currentItemIndex > 0) {
      dispatch({ type: 'DECREMENT_INDEX' });
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