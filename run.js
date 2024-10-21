// file: omdb-movie-data/run.js
const omdbMovieData = require('./handler');
require('dotenv').config();

async function main() {
    const context = {
        config: {
            name: 'OMDB Movie Data Fetcher',
            version: '1.0.7'
        },
        introspect: console.log,
        logger: console.error,
        runtimeArgs: {
            OMDB_API_KEY: process.env.OMDB_API_KEY,
            DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'en'
        }
    };

    const mergedContext = { ...omdbMovieData.runtime, ...context };

    const testCases = [
        { title: 'Inception', year: '2010', language: 'en' },
        { imdbId: 'tt0111161', language: 'es' },
        { title: 'La vita è bella', year: '1997', language: 'it' },
        { title: 'La vita è bella', language: 'it' },
        { title: 'Life Is Beautiful', year: '1997', language: 'en' },
        { title: 'Amélie', year: '2001', language: 'fr' },
        { title: 'Non-existent Movie', year: '2023' },
        { title: 'Inception', year: '2000' }
    ];

    for (const input of testCases) {
        console.log(`\nTesting for ${input.title || input.imdbId} ${input.year ? `(${input.year})` : ''} in ${input.language || 'default language'}:`);
        const result = await omdbMovieData.runtime.handler.call(mergedContext, input);
        console.log('Result:', result);

        try {
            const parsedResult = JSON.parse(result);
            console.log('Parsed result:', JSON.stringify(parsedResult, null, 2));
        } catch (e) {
            console.log('Result is not a valid JSON. Raw output:', result);
        }
    }

    // Test missing API key
    const contextWithoutApiKey = { ...context, runtimeArgs: { ...context.runtimeArgs, OMDB_API_KEY: undefined } };
    const mergedContextWithoutApiKey = { ...omdbMovieData.runtime, ...contextWithoutApiKey };
    console.log('\nTesting with missing API key:');
    const result = await omdbMovieData.runtime.handler.call(mergedContextWithoutApiKey, { title: 'Inception' });
    console.log(result);
}

main().catch(console.error);