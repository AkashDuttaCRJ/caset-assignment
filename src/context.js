import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const PicstoreContext = createContext();

export const PicstoreProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [topics, setTopics] = useState([]);
    const [err, setErr] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);

    const appendData = (newData) => {
        if (data.length === 0) {
            setData(newData);
        } else {
            newData.forEach((item) => {
                const isDuplicate = data.some((oldItem) => oldItem.id === item.id);
                if (!isDuplicate) {
                    setData(prev => [...prev, item]);
                }
            });
        }
    }
    return (
        <PicstoreContext.Provider value={{ data, setData, appendData, err, setErr, currentPage, setCurrentPage, searchTerm, setSearchTerm, topics, setTopics, selectedTopic, setSelectedTopic }}>
        {children}
        </PicstoreContext.Provider>
    );
}

export const usePicstoreContext = () => useContext(PicstoreContext);