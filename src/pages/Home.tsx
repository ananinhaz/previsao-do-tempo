import React from 'react';
import CardTempo from '../components/Cardtempo';

interface HomeProps {
  favoritos: string[];
  setFavoritos: React.Dispatch<React.SetStateAction<string[]>>;
}

const Home: React.FC<HomeProps> = ({ favoritos, setFavoritos }) => {
  return (
    <div>
      <CardTempo favoritos={favoritos} setFavoritos={setFavoritos} />
    </div>
  );
};

export default Home;