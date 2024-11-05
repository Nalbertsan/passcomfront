import { useContext, useState } from 'react';
import { Modal } from 'antd';
import { extractTravelInfo } from '../../Utils/functions';
import { Travel } from '../../Utils/Response';
import useAccent from '../../hooks/useAccent';
import AuthContext from '../../context/AuthContext';

export type Seat = {
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  number: number;
};

interface ModalTravelProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  seats: Seat[];
  travel: Travel;
}

const ModalTravel = ({ handleCancel, open, title, seats, travel }: ModalTravelProps) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const { mutationSellAccent } = useAccent();
  const {
    auth,
 } = useContext(AuthContext);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'AVAILABLE') {
      setSelectedSeat(seat);
      setConfirmModalVisible(true);
    }
  };

  const handleConfirmPurchase = () => {
    if (selectedSeat) {
      const travelServer = extractTravelInfo(travel);
      mutationSellAccent.mutate({
        accentNumber: selectedSeat.number, email: auth?.email || '',
         serversTravels:travelServer, destination: travel.endCity, 
          origin: travel.startCity })
      setConfirmModalVisible(false);
      setSelectedSeat(null);
    }
  };

  // Função para cancelar a compra
  const handleCancelPurchase = () => {
    setConfirmModalVisible(false);
    setSelectedSeat(null);
  };

  return (
    <>
      <Modal title={title} open={open} onCancel={handleCancel} footer={null} width={800}>
        <div className="text-center">
          <div className="grid grid-cols-4 gap-4 justify-center">
            {seats
              .sort((a, b) => a.number - b.number)
              .map((seat) => (
                <div
                  key={seat.number}
                  onClick={() => handleSeatClick(seat)}
                  className={`cursor-pointer w-40 h-40 flex items-center justify-center rounded text-white text-4xl font-bold ${
                    seat.status === 'AVAILABLE'
                      ? 'bg-cyan-500'
                      : seat.status === 'RESERVED'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {seat.number}
                </div>
              ))}
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Legenda:</h4>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-cyan-500 rounded mr-2"></div>
                <span>Disponível</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-yellow-500 rounded mr-2"></div>
                <span>Reservado Temporariamente</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-500 rounded mr-2"></div>
                <span>Ocupado</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal de confirmação de compra */}
      <Modal
        title="Confirmação de Compra"
        open={confirmModalVisible}
        onOk={handleConfirmPurchase}
        onCancel={handleCancelPurchase}
        okText="Confirmar"
        cancelText="Cancelar"
        centered
        width={300}
      >
        <p>Você realmente deseja comprar o assento {selectedSeat?.number}?</p>
      </Modal>
    </>
  );
};

export default ModalTravel;

