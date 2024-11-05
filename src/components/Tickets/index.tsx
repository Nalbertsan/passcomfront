type TicketProps = {
  id: string;
  origin: string;
  destination: string;
  accentNumber: number;
};

export default function Ticket({ id, origin, destination, accentNumber }: TicketProps) {
  return (
    <div className="w-full mx-auto bg-blue-100 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-lg font-semibold mb-2 text-blue-900">Ticket ID: {id}</h2>
      <div className="text-gray-800">
        <p className="mb-1">
          <span className="font-semibold">Origem:</span> {origin}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Destino:</span> {destination}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Número do acento:</span> {accentNumber}
        </p>
      </div>
    </div>
  );
}

