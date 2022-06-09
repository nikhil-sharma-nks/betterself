import React, { useEffect, useState } from 'react';
import './home.scss';
import { getAllVideos, getAllCategories } from '../../api';
import { useVideo, useTheme } from '../../context';
import Select from 'react-select';
import { VideoContainer, Spinner, Sidebar } from '../../components';

const Home = () => {
  const { videoState, videoDispatch } = useVideo();
  const [loading, setLoading] = useState(false);

  const {
    categories,
    likedVideos,
    history,
    videos,
    watchLater,
    playlists,
    sortBy,
    searchQuery,
    categorizedBy,
  } = videoState;
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const videos = await getAllVideos();
        videoDispatch({
          type: 'LOAD_VIDEOS',
          payload: videos,
        });
        const categories = await getAllCategories();
        videoDispatch({
          type: 'LOAD_CATEGORIES',
          payload: categories,
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (selectedOption) => {
    let payload = '';
    if (selectedOption?.value) {
      payload = selectedOption.value;
    }
    videoDispatch({ type: 'SORT_BY', payload: payload });
  };
  const handleCategoryClick = (categoryName) => {
    videoDispatch({ type: 'CATEGORIZED_BY', payload: categoryName });
  };
  const options = [
    { value: 'date-latest', label: 'Date(Latest)' },
    { value: 'date-oldest', label: 'Date(Oldest)' },
    { value: 'popularity', label: 'Popularity' },
  ];
  const styles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: state.selectProps.myFontSize,
    }),
  };

  return (
    <div className='app-body'>
      <Sidebar />
      <div className='main-body home-page '>
        <div className='category-pill-container'>
          {categories.map((category) => (
            <div
              className={
                categorizedBy !== category.categoryName
                  ? 'category-pill'
                  : 'category-pill category-pill-active'
              }
              onClick={() => handleCategoryClick(category.categoryName)}
              key={category.id}
            >
              {category.categoryName.charAt(0).toUpperCase() +
                category.categoryName.slice(1)}
            </div>
          ))}
        </div>
        <div className='filter-container dropdown'>
          <Select
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
            styles={styles}
            placeholder='Sort By'
            className='select-box'
            isClearable
          />
        </div>
        {loading ? <Spinner /> : <VideoContainer />}
      </div>
    </div>
  );
};

export { Home };
