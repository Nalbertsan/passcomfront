import { Card, Radio, Typography } from "antd";
import TravelImg from '../assets/travel.png'
import Form from "../components/Form";
import { MdOutlineMailOutline } from "react-icons/md";
import { z } from "zod";
import { Button } from "@mui/material";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { DataLogin } from "../Utils/Data";
import { Link } from "react-router-dom";

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Digite uma senha válida!"),
})

const options = [
  { label: 'Servidor 1', value: 1 },
  { label: 'Servidor 2', value: 2 },
  { label: 'Servidor 3', value: 3 },
];

export default function Login() {
  const [value, setValue] = useState<number>(1);
  const { mutationLogin } = useAuth(value);
  return (
    <main className="w-full min-h-screen h-full flex flex-row">
      <section className="w-[65%] bg-black min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Typography className="text-white font-extrabold text-5xl">Bem vindo ao PassCom!</Typography>
          <img src={TravelImg} alt="" />
        </div>
      </section>
      
      <Card className="w-[35%] flex items-center justify-center">
        <div className=" flex flex-col gap-4 min-w-100">
          <Typography className="text-caroline-blue font-extrabold text-4xl text-center">Entre na sua conta</Typography>
          <Radio.Group
            block
            options={options}
            defaultValue={1}
            optionType="button"
            buttonStyle="solid"
            name="server"
            onChange={(e) => setValue(e.target.value)}
          />
          <Form.Container classname="flex flex-col gap-6" onSubmit={(data) => {
            const aux:DataLogin = {
              ...data,
              server: value
            }
            mutationLogin.mutate(aux)
            }} schema={schemaLogin}>
            <Form.TextInputIcon
              title="Email:"
              name="email"
              icon={MdOutlineMailOutline}
            />
            <Form.PasswordInput
              title="Senha:"
              name="password"
            />
            <Button fullWidth type="submit" variant="contained">Entrar</Button>
          </Form.Container>
        </div>
        <div className="mt-4">
          <Link to="/register" className="text-blue-800 underline text-base" >Não possui conta? Cadastre-se</Link>
        </div>
      </Card>
    </main>
  )
}
