const scoreAvgByYear = scoreSumByYear.map(row => {
    let avgScore = row.scoreSum / row.count
    return { year: row.year, scoreAvg: avgScore };
})
return scoreAvgByYear;