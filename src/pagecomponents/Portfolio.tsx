//this component is child of app - data is being sent down from app
import { useState } from "react";
import "../Modal.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import InputCoin from "../inputcomponents/InputCoin";
import PortfolioCoin from "../portfoliocomponents/PortfolioCoin";
import { BsLightning } from "react-icons/bs";
import { PortfolioPageType, PortfolioProps } from "../types/coin_types";

const Portfolio = (props: PortfolioProps) => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [deletePortfolioModal, setDeletePortfolioModal] =
    useState<boolean>(false);
  const [portfolioSearch, setPortfolioSearch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const { portfolio, addPortfolio, coins } = props;

  const togglePortfolioModal = () => {
    setPortfolioModal(!portfolioModal);
  };

  // const toggleDeletePortfolioModal = () => {
  //   setDeletePortfolioModal(!deletePortfolioModal);
  // };

  const toggleDeletePortfolioModal = () => {
    if (portfolio.length > 0) {
      setDeletePortfolioModal(!deletePortfolioModal);
    } else {
      addPortfolio([]);
    }
  };

  const handlePortfolioSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPortfolioSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  // const onDeletePortfolio = () => {
  //   addPortfolio([]);
  // };

  // const onDeletePortfolio = () => {
  //   if (portfolio.length > 0) {
  //     toast.warning(
  //       <>
  //         Are you sure you want to delete Portfolio?{" "}
  //         <button
  //           className="toast-delete-portfolio"
  //           onClick={() => {
  //             addPortfolio([]);
  //             toast.dismiss(); // Dismiss the toast after action

  //           }}
  //         >
  //           Yes
  //         </button>
  //       </>,
  //       {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: false, // Keep the toast open until closed manually
  //       }
  //     );
  //   } else {
  //     addPortfolio([]);
  //   }
  // };

  // needs to trigger modal

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
    setPortfolioSearch(name);
  };

  //adding new coin to portfolio, need to add quantity, price * quantity = totalvalue
  const onAddNewCoin = () => {
    const newCoin: any = [...portfolio];
    //add new item to portfolio/state
    newCoin.push({ name: portfolioSearch, quantity });
    // console.log("new coin", newCoin);
    addPortfolio(newCoin);
    //empty search inputs
    setPortfolioSearch("");
    setQuantity("");
    setPortfolioModal(!portfolioModal);
  };

  return (
    <>
      <ToastContainer limit={1} />
      <h4 className="portfolio-header">
        <BsLightning size={22} />
        Quick Portfolio
      </h4>
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

            <ul className="input-coin">
              {coinResults.map((coin: PortfolioPageType) => {
                return (
                  <li onClick={() => chooseCoin(coin.name)} key={coin.name}>
                    <InputCoin
                      image={coin.image}
                      symbol={coin.symbol.toUpperCase()}
                      name={coin.name}
                    />
                  </li>
                );
              })}
            </ul>

            <button onClick={togglePortfolioModal} className="close-modal">
              X
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

      {/* <div className="delete-portfolio-btn">
        <button onClick={onDeletePortfolio} className="delete-coin-button">
          Delete Portfolio
        </button>
      </div> */}

      <div className="delete-portfolio-btn">
        <button
          onClick={toggleDeletePortfolioModal}
          className="delete-coin-button"
        >
          Delete Portfolio
        </button>
      </div>

      {deletePortfolioModal && (
        <div className="edit-modal">
          <div onClick={toggleDeletePortfolioModal} className="overlay"></div>
          <div className="modal-content">
            {/* <h4 className="modal-header">
              Are you sure you want to delete portfolio?
            </h4> */}

            <div className="edit-coin-btn-container">
              <button
                onClick={toggleDeletePortfolioModal}
                className="close-modal"
              >
                x
              </button>
              <p>Are you sure you want to delete portfolio?</p>
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
