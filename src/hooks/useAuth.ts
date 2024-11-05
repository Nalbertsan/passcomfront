import { useContext } from "react";
import AuthContext, { AuthType } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { setHeaderToken } from "../api/BaseAPI";
import notifies from "../Utils/notifies";
import { loginReq, registerReq } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";

export default function useAuth(server?: number) {
  const {
     setAuth,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const mutationLogin = useMutation({
    mutationFn: loginReq,
    onSuccess: (data) => {
      setHeaderToken(data.token);
      localStorage.setItem('passcom-token', data.token);
      localStorage.setItem('passcom-server', String(server));
      const user = {
        email: data.email,
        name: data.name,
      };
      localStorage.setItem('user', JSON.stringify(user));
      setAuth(user);
      notifies.sucess('Tudo Certo');
      navigate('/');
    },
    onError: () => {
      notifies.error('Ocorreu um erro');
    },
  });

  const mutationRegister = useMutation({
    mutationFn: registerReq,
    onSuccess: (data) => {
      setHeaderToken(data.token);
      localStorage.setItem('passcom-token', data.token);
      localStorage.setItem('passcom-server', String(server));
      const user = {
        email: data.email,
        name: data.name,
      };
      localStorage.setItem('user', JSON.stringify(user));
      setAuth(user);
      notifies.sucess('Tudo Certo');
      navigate('/');
    },
    onError: () => {
      notifies.error('Ocorreu um erro');
    },
  });

  function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
      setAuth(null);
      navigate('/login');
      return;
    }
    console.log(JSON.parse(user) as AuthType)
    setAuth(JSON.parse(user) as AuthType);
  }

  function checkNotAuth() {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(JSON.parse(user) as AuthType);
      navigate('/');
      return;
    }
    setAuth(null);
  }

  const logout = () => {
    localStorage.removeItem('passcom-token');
    localStorage.removeItem('passcom-server');
    localStorage.removeItem('user');
    setAuth(null);
    navigate('/login');
  }

  function serverAuth() {
    const user = localStorage.getItem('user');
    const serverNum = Number(localStorage.getItem('passcom-server'));
    if (user) {
      if (serverNum === 1) return import.meta.env.VITE_BASE_API_s1;
      if (serverNum === 2) return import.meta.env.VITE_BASE_API_s2;
      if (serverNum === 3) return import.meta.env.VITE_BASE_API_s3;
    }
    return import.meta.env.VITE_BASE_API_s1;
  }

  return ({
    mutationRegister,
    mutationLogin,
    checkAuth,
    checkNotAuth,
    serverAuth,
    logout
  })
}

