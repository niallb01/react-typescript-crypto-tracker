import { useState, useEffect, useRef } from "react";
import "../styles/Modal.css";
import "react-toastify/dist/ReactToastify.css";
import InputCoin from "../inputcomponents/InputCoin";
import PortfolioCoin from "../portfoliocomponents/PortfolioCoin";
import { BsLightning } from "react-icons/bs";
import { PortfolioPageType, PortfolioProps } from "../types/coin_types";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "../styles/Dropdown.css";

const Portfolio = (props: PortfolioProps) => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [deletePortfolioModal, setDeletePortfolioModal] =
    useState<boolean>(false);
  const [addCoinModal, setAddCoinModal] = useState<boolean>(false);
  const [portfolioSearch, setPortfolioSearch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [searchDropdown, setSearchDropdown] = useState<boolean>(false);

  const { portfolio, addPortfolio, coins } = props;

  let searchDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node)
      ) {
        setSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [searchDropdown]);

  const togglePortfolioModal = () => {
    setPortfolioModal(!portfolioModal);
  };

  const toggleCheckModal = () => {
    setCheckModal(!checkModal);
  };

  const toggleDeletePortfolioModal = () => {
    if (portfolio.length > 0) {
      setDeletePortfolioModal(!deletePortfolioModal);
    } else {
      addPortfolio([]);
    }
  };

  const toggleAddCoinModal = () => {
    setAddCoinModal(!addCoinModal);
  };

  const handlePortfolioSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value.trim(); // Trim whitespace from input value
    setPortfolioSearch(inputValue); // Update the search state with trimmed input value
    setSearchDropdown(!!inputValue);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchDropdown(true); // Open search dropdown when search input is clicked
  };

  const onDeletePortfolioCoin = (coin: string) => {
    const portfolioCopy = [...portfolio];
    const indexOf = portfolioCopy.findIndex((item) => {
      return item.name === coin;
    });
    portfolioCopy.splice(indexOf, 1);
    addPortfolio(portfolioCopy);
  };

  const onUpdatePortfolioCoin = (name: string, quantity: string) => {
    const portfolioCopy = [...portfolio];
    const indexOf = portfolioCopy.findIndex((item) => {
      return item.name === name;
    });
    portfolioCopy[indexOf].quantity = quantity;
    addPortfolio(portfolioCopy);
  };

  //looks inside each object of the array to see if coin name is inside it
  const coinPortfolio = coins.filter((coin: PortfolioPageType) => {
    const indexOf = portfolio.findIndex((item) => {
      return item.name === coin.name;
    });
    if (indexOf > -1) {
      return true;
    }
  });

  const coinResults = coins.filter((coin: PortfolioPageType) => {
    return coin.name.toLowerCase().includes(portfolioSearch);
  });

  const chooseCoin = (name: string) => {
    setSearchDropdown(false);
    setPortfolioSearch(name);
  };

  const onAddNewCoin = () => {
    const quantityNumber = Number(quantity);
    if (portfolioSearch === "" || !/^[a-zA-Z\s]+$/.test(portfolioSearch)) {
      setAddCoinModal(!addCoinModal);
      return;
    }
    if (quantity.length > 0 && !isNaN(quantityNumber) && quantityNumber > 0) {
      const newCoin: any = [...portfolio];
      const coinIndex = newCoin.findIndex(
        (coin: any) => coin.name === portfolioSearch
      );

      if (coinIndex !== -1) {
        // Update the quantity of the existing coin
        newCoin[coinIndex].quantity = quantityNumber;
      } else {
        // Add a new coin to the portfolio
        newCoin.push({ name: portfolioSearch, quantity: quantityNumber });
      }
      addPortfolio(newCoin);
      setPortfolioSearch("");
      setQuantity("");
      setPortfolioModal(!portfolioModal);
    } else {
      setAddCoinModal(!addCoinModal);
    }
  };

  return (
    <>
      <h4 className="portfolio-header">
        <BsLightning size={22} />
        Quick Portfolio
      </h4>

      {checkModal && (
        <div className="modal">
          <div onClick={toggleCheckModal} className="overlay"></div>
          <div className="modal-content-check">
            <IoWarningOutline
              size={24}
              className="delete-portfolio-modal-icon"
            />
            <p className="update-portfolio-modal-text">
              Please enter coins to share portfolio.
            </p>
            <div className="edit-coin-btn-container">
              <button
                onClick={toggleCheckModal}
                className="close-modal-delete-portfolio"
              >
                <IoMdCloseCircleOutline />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="add-portfolio-btn">
        <button onClick={togglePortfolioModal} className="btn-modal">
          + Add Coin
        </button>
      </div>
      {portfolioModal && (
        <div className="modal">
          <div onClick={togglePortfolioModal} className="overlay"></div>
          <div className="modal-content-portfolio">
            <h4 className="modal-header">Add Coin</h4>
            <input
              className="portfolio-search"
              list="search-input-3"
              placeholder="Search Coin..."
              value={portfolioSearch}
              onClick={handleSearchClick}
              onInput={handlePortfolioSearchInput}
            />

            <input
              onInput={handleQuantity}
              type="text"
              className="portfolio-quantity"
              value={quantity}
              placeholder="Add Quantity..."
            />

            <button onClick={onAddNewCoin} className="add-portfolio-coin-btn">
              + Add
            </button>

            {searchDropdown && (
              <div
                className="portfolio-search-dropdown"
                ref={searchDropdownRef}
              >
                {coinResults.map((coin: PortfolioPageType) => (
                  <div
                    key={coin.name}
                    onClick={() => chooseCoin(coin.name)}
                    className="portfolio-search-dropdown-row"
                  >
                    <InputCoin
                      image={coin.image}
                      symbol={coin.symbol.toUpperCase()}
                      name={coin.name}
                    />
                  </div>
                ))}
              </div>
            )}

            {addCoinModal && (
              <div className="modal">
                <div onClick={toggleAddCoinModal} className="overlay"></div>
                <div className="modal-content-add-coin">
                  <p className="add-coin-modal-text">
                    <IoWarningOutline
                      size={24}
                      className="delete-portfolio-modal-icon"
                    />
                    Please add a valid coin name or quantity
                  </p>
                  <div className="edit-coin-btn-container">
                    <button
                      onClick={toggleAddCoinModal}
                      className="close-modal-edit-coin"
                    >
                      <IoMdCloseCircleOutline />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button onClick={togglePortfolioModal} className="close-modal">
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>
        </div>
      )}
      {coinPortfolio.map((coin: PortfolioPageType) => {
        const item = portfolio.find((item) => {
          return item.name === coin.name;
        });
        return (
          <div className="portfolio-container" key={coin.name}>
            <div className="portfolio-row">
              <PortfolioCoin
                rank={coin.market_cap_rank}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol.toUpperCase()}
                twentyFourHour={coin.price_change_percentage_24h.toFixed(1)}
                coinPrice={coin.current_price.toLocaleString()}
                quantity={item?.quantity}
                marketCap={(coin.market_cap / 1000000000).toFixed(2)}
                totalValue={(
                  item?.quantity * coin.current_price
                ).toLocaleString()}
                onDeletePortfolioCoin={onDeletePortfolioCoin}
                onUpdatePortfolioCoin={onUpdatePortfolioCoin}
              />
            </div>
          </div>
        );
      })}

      {coinPortfolio.length === 0 && (
        <div className="add-portfolio-coin-text">
          <p>
            You don't have any holdings at the moment. Click Add a Coin button
            to add Coins to your portfolio.
          </p>
        </div>
      )}

      <div className="delete-portfolio-btn">
        <button
          onClick={toggleDeletePortfolioModal}
          className="delete-coin-button"
        >
          Delete Portfolio
        </button>
      </div>
      {deletePortfolioModal && (
        <div className="delete-portfolio-modal">
          <div onClick={toggleDeletePortfolioModal} className="overlay"></div>
          <div className="modal-content-delete-portfolio">
            <IoWarningOutline
              size={24}
              className="delete-portfolio-modal-icon"
            />
            <p className="delete-portfolio-modal-text">
              Are you sure you want to delete portfolio?
            </p>

            <div className="edit-coin-btn-container">
              <button
                onClick={toggleDeletePortfolioModal}
                className="close-modal-delete-portfolio"
              >
                <IoMdCloseCircleOutline />
              </button>

              <br></br>
              <button
                onClick={() => {
                  addPortfolio([]);
                  toggleDeletePortfolioModal();
                }}
                className="delete-portfolio-modal-btn"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="portfolio-page-footer"></div>
    </>
  );
};

export default Portfolio;
