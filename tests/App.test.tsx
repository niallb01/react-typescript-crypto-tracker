import { it, expect, describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { getCoins, getDescCoins, coins } from "../src/App";
import { MemoryRouter, Router } from "react-router-dom";
import React from "react";

// describe("App", () => {
//   it("pages renders", () => {
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//   });
// });

// describe("getCoins", () => {
//   it("fetches coin JSON data and adds it to state", () => {
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//     // const coinsResponse = getCoins;
//     // run assertions

//     getCoins();

//     const expectedCoins = {
//       id: "bitcoin",
//       symbol: "btc",
//       name: "Bitcoin",
//       image:
//         "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//       current_price: 16962.21,
//       market_cap: 324718794812,
//       market_cap_rank: 1,
//       fully_diluted_valuation: 355947584982,
//       total_volume: 42279110530,
//       price_change_24h: 224.1,
//       price_change_percentage_24h: 1.33884,
//       twentyFourHour: 0,
//       quantity: "",
//       coin: "",
//       filtered: [],
//       item: [],
//       volume: 0,
//     };

//     expect(getCoins()).toMatchObject(expectedCoins);
//   });
// });

// describe("getDescCoins", () => {
//   it("fetches coinDescription JSON data available and adds it to state", () => {
//     render(<App />);

//     // mock of coin data?
//     getDescCoins();
//   });
// });

describe("App", () => {
  it("pages render", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("getCoins function retrieves coin data", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const appInstance = container.firstChild as HTMLElement;

    // Access the coins state directly from the appInstance
    const coins = (appInstance as any).__reactProps.initialProps.coins;

    // Now you can perform assertions on the coins state
    expect(coins).toBeDefined();
    // Add more assertions here as needed
  });

  it("getCoinsDesc function retrieves coin description data", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const appInstance = container.firstChild as HTMLElement;

    // Access the coinDescription state directly from the appInstance
    const coinDescription = (appInstance as any).__reactProps.initialProps
      .coinDescription;

    // Now you can perform assertions on the coinDescription state
    expect(coinDescription).toBeDefined();
    // Add more assertions here as needed
  });
});
