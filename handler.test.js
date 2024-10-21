// file: omdb-movie-data/__tests__/handler.test.js
const { runtime } = require('handler');

describe('OMDB Movie Data Fetcher', () => {
    const mockContext = {
        runtimeArgs: {
            OMDB_API_KEY: 'mock-api-key'
        },
        config: {
            name: 'OMDB Movie Data Fetcher',
            version: '1.0.8'
        },
        introspect: jest.fn(),
        logger: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('handler should fetch movie data by title', async () => {
        const mockFetchData = jest.fn().mockResolvedValue({
            Response: 'True',
            Title: 'Inception',
            Year: '2010',
            // ... other movie data
        });

        runtime._fetchData = mockFetchData;

        const result = await runtime.handler.call(mockContext, { title: 'Inception' });

        expect(JSON.parse(result)).toHaveProperty('title', 'Inception');
        expect(mockContext.introspect).toHaveBeenCalled();
    });

    test('handler should fetch movie data by IMDb ID', async () => {
        const mockFetchData = jest.fn().mockResolvedValue({
            Response: 'True',
            Title: 'The Shawshank Redemption',
            Year: '1994',
            imdbID: 'tt0111161',
            // ... other movie data
        });

        runtime._fetchData = mockFetchData;

        const result = await runtime.handler.call(mockContext, { imdbId: 'tt0111161' });

        expect(JSON.parse(result)).toHaveProperty('imdbID', 'tt0111161');
        expect(mockContext.introspect).toHaveBeenCalled();
    });

    test('handler should handle API errors', async () => {
        const mockFetchData = jest.fn().mockResolvedValue({
            Response: 'False',
            Error: 'Movie not found!'
        });

        runtime._fetchData = mockFetchData;

        const result = await runtime.handler.call(mockContext, { title: 'NonexistentMovie' });

        expect(result).toContain('The tool failed to run');
        expect(mockContext.logger).toHaveBeenCalled();
    });
});