import { useState } from "react";
import "../Modal.css";
import { IoWarningOutline } from "react-icons/io5";

type EditCoinProps = {
  onDeletePortfolioCoin: (coin: string) => void;
  onUpdatePortfolioCoin: (name: string, quantity: string) => void;
  name: string;
};

const EditCoin = (props: EditCoinProps) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteEditModal, setDeleteEditModal] = useState<boolean>(false);
  const [updateEditModal, setUpdateEditModal] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<string>("");

  const { name, onDeletePortfolioCoin, onUpdatePortfolioCoin } = props;

  const toggleEditModal = (coin: any) => {
    setEditModal(!editModal);
    setSelectedCoin(coin);
    setQuantity("");
  };

  const toggleDeleteEditModal = () => {
    setDeleteEditModal(!deleteEditModal);
  };

  const toggleUpdateEditModal = () => {
    setUpdateEditModal(!updateEditModal);
  };

  const handleEditQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleUpdateCoin = () => {
    if (quantity === "" || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setUpdateEditModal(true);
    } else {
      onUpdatePortfolioCoin(selectedCoin, quantity);
      toggleEditModal(selectedCoin);
    }
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
                onClick={handleUpdateCoin}
                className="add-portfolio-coin-btn"
              >
                Update
              </button>
              <button onClick={toggleEditModal} className="close-modal">
                X
              </button>
              {updateEditModal && (
                <div className="update-portfolio-modal">
                  <div
                    onClick={toggleUpdateEditModal}
                    className="update-edit-overlay"
                  ></div>
                  <div className="modal-content-update-portfolio">
                    <IoWarningOutline
                      size={24}
                      className="delete-portfolio-modal-icon"
                    />
                    <p className="update-portfolio-modal-text">
                      Invalid quantity. Please enter a valid number.
                    </p>
                    <div className="edit-coin-btn-container">
                      <button
                        onClick={toggleUpdateEditModal}
                        className="close-modal-delete-portfolio"
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
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
                      Are you sure you want to delete this coin?
                    </p>
                    <div className="edit-coin-btn-container">
                      <button
                        onClick={toggleDeleteEditModal}
                        className="close-modal-delete-portfolio"
                      >
                        x
                      </button>
                      <br />
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
