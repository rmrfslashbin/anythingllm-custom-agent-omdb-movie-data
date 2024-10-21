# file: omdb-movie-data/README.md
# OMDB Movie Data Fetcher

This project is an AnythingLLM custom agent skill that fetches movie data from the OMDB API using either a movie title or IMDb ID, with support for multiple languages.

## Installation

1. Clone this repository into your AnythingLLM `plugins/agent-skills` directory.
2. Install dependencies:

```bash
yarn install
```

3. Copy the `.env.sample` file to `.env` and set your OMDB API key and default language:

```bash
cp .env.sample .env
```

Then edit the `.env` file with your actual API key and preferred default language.

## Usage

This skill can be used within AnythingLLM to fetch movie data. It accepts a movie title or an IMDb ID as input, along with optional year and language parameters.

### Examples

1. Fetch data by movie title in English:
   ```json
   {"title": "Inception", "year": "2010", "language": "en"}
   ```

2. Fetch data by IMDb ID in Spanish:
   ```json
   {"imdbId": "tt0111161", "language": "es"}
   ```

3. Fetch data using the default language (set in .env or plugin.json):
   ```json
   {"title": "Amélie", "year": "2001"}
   ```

### Known Limitations

- The skill may have difficulty finding some non-English titles, especially when searching in the original language. For best results with non-English movies, try searching with the English title.
- Example: "La vita è bella" (1997) may not be found when searching in Italian, but "Life Is Beautiful" (1997) should work correctly.

TODO: Improve search functionality for non-English titles in future releases.

## Running Tests

To run the tests:

```bash
yarn test
```

Note: Make sure the test file is located in the correct directory. The default location is `__tests__/handler.test.js`.

## Linting

To run ESLint:

```bash
yarn lint
```

If you encounter any issues with ESLint, you can try updating the `.eslintrc.js` file in the project root.

## API Documentation

This skill uses the OMDB API. For full API documentation, visit [OMDB API](http://www.omdbapi.com/).

## Environment Variables

- `OMDB_API_KEY`: Your OMDB API key (required)
- `DEFAULT_LANGUAGE`: Default language for movie data (e.g., en, es, fr)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Robert Sigler (https://github.com/rmrfslashbin)

## License

This project is licensed under the MIT License.