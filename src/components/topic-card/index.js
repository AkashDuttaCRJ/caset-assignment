import { usePicstoreContext } from '../../context';
import './TopicCard.css';

const TopicCard = ({ topic }) => {
    const { setData, setSelectedTopic, setCurrentPage } = usePicstoreContext()
  return (
    <div className="topic-card" onClick={() => {
        setData([]);
        setSelectedTopic(topic.id);
        setCurrentPage(1);
      }}>
        <img src={topic.cover_photo.urls.thumb} alt={topic.title} />
        <div className="topic-card-overlay" />
        <div className="topic-title">{topic.title}</div>
      </div>
  )
}

export default TopicCard