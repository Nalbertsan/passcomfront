import { motion } from 'framer-motion';
import useModal from '../../hooks/useModal';
import ModalTravel from '../ModalTravel';
import { Travel } from '../../Utils/Response';
import { checkSeatStatus } from '../../Utils/functions';

interface CardTravelProps {
  startCity: string;
  endCity: string;
  travel: Travel
}

export default function CardTravel({ startCity, endCity, travel }: CardTravelProps) {
  const {showModal, isModalOpen, handleCancel, handleOk} = useModal()
  console.log(travel)

  return (
    <>
      <motion.div
        className="flex items-center justify-center w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg text-white cursor-pointer"
        onClick={showModal}
        whileHover={{
          scale: 1.1,       // Zoom in
          rotate: 5,        // Pequena rotação
          transition: {     // Transição suave
            type: 'spring',
            stiffness: 300,
            damping: 15,
          },
        }}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold">{startCity} ➔ {endCity}</h2>
          <p className="mt-2">Explore a viagem entre estas cidades!</p>
        </div>
      </motion.div>
      <ModalTravel 
        handleCancel={handleCancel} 
        handleOk={handleOk}
        open={isModalOpen}
        title={`${startCity} ➔ ${endCity}`}
        seats={checkSeatStatus(travel.edges)}
        travel={travel}
        />
          
    </>
  );
}
