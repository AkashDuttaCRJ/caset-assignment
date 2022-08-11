import { useState } from 'react';
import { usePicstoreContext } from '../../context';
import './Search.css';

const Search = () => {
    const { setSearchTerm, setCurrentPage, setData } = usePicstoreContext();
    const [term, setTerm] = useState('');

    const handleSearch = () => {
      if (term !== '') {
        setSearchTerm(term);
        setCurrentPage(1);
        setData([]);
      }
    }

  return (
    <div className='search-container'>
        <input type="text" placeholder='Search for Photos' value={term} onChange={(e) => setTerm(e.target.value)} />
        <button onClick={handleSearch}>
          <img src='/search.svg' alt='search' />
        </button>
    </div>
  )
}

export default Search