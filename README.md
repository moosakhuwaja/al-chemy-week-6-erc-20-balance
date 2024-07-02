# ERC-20 Token Indexer

Welcome to the ERC-20 Token Indexer! This web application allows users to input an Ethereum address, ENS name, or connect their wallet to fetch and display all ERC-20 token balances associated with the given address.

## Features

- **Address Input**: Users can input any valid Ethereum address to get ERC-20 token balances.
- **ENS Name Input**: Users can input any valid ENS name (e.g., `myname.eth`) to resolve to an Ethereum address and fetch its ERC-20 token balances.
- **Wallet Connection**: Users can connect their MetaMask wallet to automatically fetch and display ERC-20 token balances for their wallet address.
- **Token Details**: For each token, the symbol and balance are displayed along with the token's logo.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/moosakhuwaja/al-chemy-week-6-erc-20-balance.git
   cd al-chemy-week-6-erc-20-balance
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at ` http://localhost:5173/`.

### Configuration

This application uses the Alchemy SDK to interact with the Ethereum blockchain. You need to provide your own Alchemy API key.

1. Sign up for an Alchemy account at [Alchemy](https://alchemy.com/).
2. Create a new app in the Alchemy dashboard and obtain your API key.
3. Replace the placeholder API key in the `getTokenBalance` function with your actual API key:

   ```javascript
   const config = {
     apiKey: "your-alchemy-api-key",
     network: Network.ETH_MAINNET
   };
   ```

## Usage

1. **Input Ethereum Address or ENS Name**: Enter a valid Ethereum address or ENS name in the input field and click "Check ERC-20 Token Balances" to fetch the token balances.
2. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask wallet. The application will automatically fetch and display the ERC-20 token balances for your wallet address.
3. **View Token Balances**: The ERC-20 token balances will be displayed in a grid, showing the token symbol, balance, and logo.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Chakra UI](https://chakra-ui.com/) - A simple, modular, and accessible component library
- [Alchemy SDK](https://www.alchemy.com/) - A blockchain development platform
- [ethers.js](https://docs.ethers.io/v5/) - A library for interacting with the Ethereum blockchain

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Alchemy](https://www.alchemy.com/) for providing a powerful platform for blockchain development.
- [MetaMask](https://metamask.io/) for enabling easy wallet connection and interaction with decentralized applications.
- [Chakra UI](https://chakra-ui.com/) for the beautiful and accessible component library.
