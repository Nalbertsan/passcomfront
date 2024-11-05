import { Tabs } from "antd";
import CardTravel from "../components/CardTravel";
import { NavBarComponent } from "../components/Navbar";
import useTravel from "../hooks/useTravel";
import Ticket from "../components/Tickets"

export default function Home() {
  const { getTravels , getTickets } = useTravel();


  const items = [
    {
      key: "1",
      label: "Viagens",
      children: (
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-10 rounded-lg bg-white shadow-lg">
          {getTravels?.data?.map((travel, i) => (
            <CardTravel
              key={i} // Substitua index por travel.id para uma key única
              startCity={travel.startCity}
              endCity={travel.endCity}
              travel={travel}
            />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Viagens compradas",
      children: <div className="text-center text-gray-500 flex flex-col-reverse gap-2">{getTickets?.data?.map((ticket) => (
        <Ticket
          key={ticket.id}
          origin={ticket.origin}
          destination={ticket.destination}
          accentNumber={ticket.accentNumber}
          id={ticket.id}
        />
      ))}</div>,
    },
  ];

  return (
    <main className="w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600 via-slate-600 to-slate-900">
      <header className="flex items-center justify-center">
        <NavBarComponent />
      </header>
      <section className="w-full flex justify-center py-1">
        <div className="w-full max-w-screen-lg">
          <Tabs defaultActiveKey="1" items={items} className=" custom-tabs" />
        </div>
      </section>
    </main>
  );
}
