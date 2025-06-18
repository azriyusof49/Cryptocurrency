# Exchange Rate Website

This project is a simple web application that integrates with the ExchangeRate API to provide users with real-time currency exchange rates. Users can input currency values and see the corresponding exchange rates displayed on the website.

## Project Structure

```
Cryptocurrency
├── public
│   ├── index.html        # HTML structure of the website
│   └── styles.css       # CSS styles for the website
│   └── script.js       # CSS styles for the website
├── src
│   ├── app.js           # Entry point of the Node.js application
│   └── api
│       └── exchangeRate.js # Functions to interact with the ExchangeRate API
├── package.json          # npm configuration file
└── README.md             # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/azriyusof49/Cryptocurrency.git
   cd Cryptocurrency
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file in the root directory and add your COHERE API key:**
   ```
   COHERE_API_KEY=your_api_key_here
   ```

4. **Start the server:**
   ```
   npm start
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage Guidelines

- Enter the currency value and select the currencies you want to convert in the form provided on the homepage.
- Click the submit button to fetch the exchange rates.
- The results will be displayed below the form.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.
