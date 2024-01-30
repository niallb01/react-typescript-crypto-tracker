import { useState } from "react";
import "../Modal.css";
//this component is a child of portfolioCoin - data is being sent down from portfolioCoin

const EditCoin = (props) => {
  const [editModal, setEditModal] = useState(false);
  const [quantity, setQuantity] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState();

  //we've passed down the coin into editcoin when btn is clicked we are then storing coin in local state
  const toggleEditModal = (coin) => {
    setEditModal(!editModal);
    setSelectedCoin(coin);
  };

  //event handler to edit coin quantity from user
  const handleEditQuantity = (e) => {
    setQuantity(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div className="add-portfolio-btn">
        <button
          className="edit-coin"
          onClick={() => {
            toggleEditModal(props.name);
          }}
        >
          EDIT
        </button>
      </div>
      {editModal && (
        <div className="edit-modal">
          <div onClick={toggleEditModal} className="overlay"></div>
          <div className="modal-content">
            <h4 className="modal-header">Edit Coin</h4>
            <input className="edit-coin-input" disabled value={selectedCoin} />
            <input
              onInput={handleEditQuantity}
              type="text"
              className="portfolio-quantity"
              value={quantity}
              placeholder="Enter Quantity..."
            />
            <div className="edit-coin-btn-container">
              <button
                onClick={() => {
                  props.onUpdatePortfolioCoin(selectedCoin, quantity);
                  toggleEditModal();
                }}
                className="add-portfolio-coin-btn"
              >
                Update
              </button>
              <button onClick={toggleEditModal} className="close-modal">
                X
              </button>
              <button
                onClick={() => {
                  props.onDeletePortfolioCoin(selectedCoin);
                }}
                className="delete-portfolio-coin-btn"
              >
                Delete Coin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCoin;
