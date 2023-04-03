import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactCards from '../components/ContactCards';
import Loader from '../components/ui/Loader';

export default function UserListPage() {
  const [contactList, setContactList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState(false);

  const scrollHandler = (e) => {
    const scrHeight = e.target.documentElement.scrollHeight;
    const scrTop = e.target.documentElement.scrollTop;
    const inHeight = window.innerHeight;
    if (scrHeight - (scrTop + inHeight) < 100) {
      setFetching(true);
    }
  };
  useEffect(() => {
    if (fetching) {
      setStatus(true);
      axios.get(`https://randomuser.me/api?page=${currentPage}&results=15`)
        .then((response) => {
          setContactList([...contactList, ...response.data.results]);
          setCurrentPage((prevState) => prevState + 1);
          setStatus(false);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function vozmiteNaRabotu() {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className="bg-gray-100 h-full">
      <section className="p-10 min-w-max grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <ContactCards contactList={contactList} />
      </section>
      {status && <Loader />}
    </div>
  );
}
