import { useEffect, useState } from 'react';
import { Unsplash } from './api';
import './App.css';
import ImageCard from './components/image-card';
import Search from './components/search';
import TopicCard from './components/topic-card';
import { usePicstoreContext } from './context';

function App() {
  const { data, setData, appendData, setErr, searchTerm, setSearchTerm, currentPage, setCurrentPage, topics, setTopics, selectedTopic, setSelectedTopic } = usePicstoreContext();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchHomeData(currentPage);
    fetchTopicData();
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    searchTerm !== '' && currentPage === 1 && fetchSearchData({ query: searchTerm, page: currentPage });
    document.addEventListener('scroll', handleIncrement);
    // eslint-disable-next-line
  },[searchTerm])

  useEffect(() => {
    selectedTopic !== null && currentPage === 1 && fetchSelectedTopic(currentPage);
    // eslint-disable-next-line
  },[selectedTopic])

  useEffect(() => {
    currentPage > 1 && (searchTerm === '' ? selectedTopic ? fetchSelectedTopic(currentPage) : fetchHomeData(currentPage) : fetchSearchData({ query: searchTerm, page: currentPage }));
    // eslint-disable-next-line
  }, [currentPage])

  const fetchHomeData = (page) => {
    setLoading(true);
    Unsplash.fetchHomePageData(page)
    .then(res => {
      if (res.type === 'success') {
        appendData(res.response.results);
      } else {
        setErr(res.errors);
      }
      setLoading(false);
    })
  }

  const fetchTopicData = () => {
    Unsplash.fetchTopicList()
    .then(res => {
      if (res.type === 'success') {
        setTopics(res.response.results);
      } else {
        setErr(res.errors);
      }
    })
  }

  const fetchSearchData = (queryParams) => {
    setLoading(true);
    const { page } = queryParams;
    if (totalPages > 0 && page > totalPages) {
      setCurrentPage(totalPages);
      return;
    }
    Unsplash.fetchSearchResult(queryParams)
    .then(res => {
      if (res.type === 'success') {
        appendData(res.response.results);
        setTotalPages(res.response.total_pages);
      } else {
        setErr(res.errors);
      }
      setLoading(false);
    })
  }

  const handleIncrement = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setCurrentPage(prev => prev + 1);
    }
  }

  const fetchSelectedTopic = (page = 1) => {
    setLoading(true);
    Unsplash.fetchTopicData({ id: selectedTopic, page })
      .then(res => {
        if (res.type === 'success') {
          appendData(res.response.results);
        } else {
          setErr(res.errors);
        }
        setLoading(false);
      })
  }

  return (
    <div className="App">
      {/* Header */}
      <div className="app-header">
        <img src='/logo_picstore.png' alt='app-logo' onClick={() => {
          setCurrentPage(1);
          setSearchTerm('');
          setSelectedTopic(null);
          setData([]);
          fetchHomeData(1);
        }} />
      </div>

      {/* Search */}
      <Search />

      {/* Topics */}
      <div className="topic-container">
        {topics.map((topic) => {
          return (
            <TopicCard topic={topic} key={topic.id} />
          )
        })}
      </div>

      {/* Images */}
      <div className='image-cards-container'>
      {data?.length !== 0 && data?.map(item => {
        return (
          <ImageCard item={item} key={item.id} />
        )})
      }
      </div>

      {/* Loading Indicator */}
      {loading && <div className='loading'>
        <img src='/Spinner.svg' alt='loading' />
        Loading...
      </div>}
    </div>
  );
}

export default App;
