// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directorsWithDuplicates = moviesArray.map(movie => movie.director);
    const directors = [...new Set(directorsWithDuplicates)];
    return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const moviesOfSteven = moviesArray.filter(movie => {
        return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama');
    });

    return moviesOfSteven.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    }
    const moviesWithScore = moviesArray.filter(movie => 'score' in movie && typeof movie.score === 'number');
    const totalScore = moviesWithScore.reduce((sum, movie) => sum + movie.score, 0);
    const avgScore = (totalScore / moviesArray.length).toFixed(2);
    return Number(avgScore);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const moviesWithScore = moviesArray.filter(movie => 'score' in movie && typeof movie.score === 'number');
    const dramaMovies = moviesWithScore.filter(movie => movie.genre.includes('Drama'));
    if (dramaMovies.length === 0) {
        return 0;
    }
    const totalDramaScore = dramaMovies.reduce((sum, movie) => sum + movie.score, 0);
    const avgDramaScore = (totalDramaScore / dramaMovies.length).toFixed(2);
    return Number(avgDramaScore);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const copyArray = [...moviesArray];
    const orderedYearTitle = copyArray.sort((movie1, movie2) => {
        if (movie1.year === movie2.year) {
            if (movie1.title < movie2.title) return -1;
            else if (movie1.title > movie2.title) return 1;
            else return 0;
        }
        return movie1.year - movie2.year;
    });
    return orderedYearTitle;
}


// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const copyArray1 = [...moviesArray];
    const orderedAlpa = copyArray1.sort((movie1, movie2) => {
        if (movie1.title < movie2.title) return -1;
        else if (movie1.title > movie2.title) return 1;
        else return 0;
    });
    const orderedAlphaTwenty = orderedAlpa.slice(0, 20).map(movie => movie.title);

    return orderedAlphaTwenty;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const moviesMinutes = moviesArray.map(movie => {
        if (movie.duration.includes('h') && movie.duration.includes('min')) {
            let parts = movie.duration.split(' ');
            let hours = Number(parts[0].replace(/\D/g, '')) || 0;
            let minutes = Number(parts[1].replace(/\D/g, '')) || 0;
            let totalMinutes = hours * 60 + minutes;
            return { ...movie, duration: totalMinutes };
        }
        let hours = 0;
        let minutes = 0;
        if (movie.duration.includes('h')) {
            hours = Number(movie.duration.split('h')[0]);
        }
        if (movie.duration.includes('min')) {
            minutes = Number(movie.duration.split('min')[0]);
        }
        const totalMinutes = hours * 60 + minutes;
        return { ...movie, duration: totalMinutes };
    });
    return moviesMinutes;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
    }
    const scoreSumByYear = [];

    moviesArray.forEach(movie => {
        // Find the index of the year in the scoreSumByYear array
        const yearIndex = scoreSumByYear.findIndex(entry => entry.year === movie.year);

        // If the year already exists, update the .scoreSum in the array.
        if (yearIndex !== -1) {
            scoreSumByYear[yearIndex].scoreSum += movie.score;
            scoreSumByYear[yearIndex].count++;
        } else {
            // Otherwise, add a new year to the array and assign the score to that year
            scoreSumByYear.push({ year: movie.year, scoreSum: movie.score, count: 1 });
        }
    });
    // return scoreSumByYear;

    const scoreAvgByYear = scoreSumByYear.map(row => {
        let avgScore = row.scoreSum / row.count
        return { year: row.year, scoreAvg: avgScore };
    })
    // return scoreAvgByYear;

    let bestScore = 0;
    let bestYears = [];
    scoreAvgByYear.forEach(row => {
        if (row.scoreAvg > bestScore) {
            bestScore = row.scoreAvg;
            bestYears = [row.year];
        }
        else if (row.scoreAvg === bestScore) {
            bestYears.push(row.year);
        }
    })

    let bestYear = bestYears[0];
    bestYears.forEach(year => {
        if (year < bestYear) {
            bestYear = year;
        }
    })
    return `The best year was ${bestYear} with an average score of ${bestScore}`;
}

