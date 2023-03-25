import React, { useState, useEffect } from 'react';
import styles from '@/styles/MainContent.module.css'
import { getLatestSeries } from '../../services/tvmaze';
import Card from '../card/Card';

function MainContentContainer(props) {
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedPremierDate, setSelectedPremierDate] = useState('');
  const [selectedSortOrder, setSelectedSortOrder] = useState('');

  useEffect(() => {
    async function fetchSeries() {
      const seriesData = await getLatestSeries();      
      setSeries(seriesData);
    }

    fetchSeries();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handlePremierDateChange = (event) => {
    setSelectedPremierDate(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSelectedSortOrder(event.target.value);
  };

  const filteredSeries = series
    .filter((serie) =>
      serie.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((serie) =>
      selectedGenre ? serie.genres.includes(selectedGenre) : true
    )
    .filter((serie) =>
      selectedRating ? serie.rating.average >= selectedRating : true
    )
    .filter((serie) =>
      selectedPremierDate ? new Date(serie.premiered) >= new Date(selectedPremierDate) : true
    )
    .sort((a, b) => {
      if (selectedSortOrder === 'asc') {
        return new Date(a.premiered) - new Date(b.premiered);
      } else if (selectedSortOrder === 'desc') {
        return new Date(b.premiered) - new Date(a.premiered);
      }
      return 0;
    });

  const filteredSeriesCount = filteredSeries.length;

  const genres = [...new Set(series.flatMap((serie) => serie.genres))];

  const ratings = [1,2,3,4,5,6,7,8,9];

  const allPremierDates = [...new Set(series.flatMap((serie) => new Date(serie.premiered).getFullYear()))].sort();

  return (
    <div className={styles.container}>
      {props.children}

      <div className={styles.content_container}>
        <h2>Latest TV Series</h2>

        <div className={styles.filter_container}>

        <div>
          <input
            type="text"
            placeholder="Search for a series"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select value={selectedRating} onChange={handleRatingChange}>
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <select value={selectedPremierDate} onChange={handlePremierDateChange}>
            <option value="">All Dates</option>
            {allPremierDates.map((dates) => (
              <option key={dates} value={dates}>
                {dates}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select value={selectedSortOrder} onChange={handleSortOrderChange}>
            <option value="">Sort by premiered date</option>
            <option value="asc">Oldest to Newest</option>
            <option value="desc">Newest to Oldest</option>
          </select>
        </div>

        <div>
          Result count: {filteredSeriesCount}
        </div>

        </div>


        {filteredSeries.map((serie) => (
          <Card key={serie.id} seriesData={serie}></Card>
        ))}
      </div>
    </div>
  );
}

export default MainContentContainer;
