import { useState } from "react";
import "../Modal.css";
import { IoWarningOutline } from "react-icons/io5";
//this component is a child of portfolioCoin - data is being sent down from portfolioCoin

type EditCoinProps = {
  onDeletePortfolioCoin: (coin: string) => void;
  onUpdatePortfolioCoin: (name: string, quantity: string) => void;
  name: string;
};

const EditCoin = (props: EditCoinProps) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteEditModal, setDeleteEditModal] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<string>("");

  const { name, onDeletePortfolioCoin, onUpdatePortfolioCoin } = props;

  //we've passed down the coin into editcoin when btn is clicked we are then storing coin in local state
  const toggleEditModal = (coin: any) => {
    setEditModal(!editModal);
    setSelectedCoin(coin);
    setQuantity("");
  };

  const toggleDeleteEditModal = () => {
    setDeleteEditModal(!deleteEditModal);
  };

  //event handler to edit coin quantity from user
  const handleEditQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <div className="add-portfolio-btn">
        <button
          className="edit-coin"
          onClick={() => {
            toggleEditModal(name);
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
                  onUpdatePortfolioCoin(selectedCoin, quantity);
                  toggleEditModal(selectedCoin);
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
                  // onDeletePortfolioCoin(selectedCoin);
                  setDeleteEditModal(!editModal);
                  toggleDeleteEditModal();
                }}
                className="delete-portfolio-coin-btn"
              >
                Delete Coin
              </button>
              {deleteEditModal && (
                <div className="delete-portfolio-modal">
                  <div
                    onClick={toggleDeleteEditModal}
                    className="delete-edit-overlay"
                  ></div>
                  <div className="modal-content-delete-portfolio">
                    <IoWarningOutline
                      size={24}
                      className="delete-portfolio-modal-icon"
                    />
                    <p className="delete-portfolio-modal-text">
                      Are you sure you want to delete coin?
                    </p>

                    <div className="edit-coin-btn-container">
                      <button
                        onClick={toggleDeleteEditModal}
                        className="close-modal-delete-portfolio"
                      >
                        x
                      </button>

                      <br></br>
                      <button
                        onClick={() => {
                          onDeletePortfolioCoin(selectedCoin);
                          toggleDeleteEditModal();
                        }}
                        className="delete-portfolio-modal-btn"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCoin;
