import { View, Text } from 'react-native'
import React from 'react'
import { estadologinGlobal } from './contextData';
import { useState } from 'react';

export default function StateLogin({ children }) {
  const [perfil, setPerfil] = useState()
  const [isLogin, setisLogin] = useState(false)
  const [dataUsers, setDataUsers] = useState([])

  const login = () => {
    setisLogin(true)

  }

  const logout = () => {
    setisLogin(false)
  }

  const getDataUsers = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:4000/api/usuario", requestOptions);
      const result = await response.json();
      console.log(result)
      setDataUsers(result.body);
    } catch (error) {
      console.error(error);
    };
  }

  const deleteUser = async (data) => {
    if (data.id === "") {
      return alert("ID no obtenida");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id": data.id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:4000/api/usuario/eliminar", requestOptions);
      const result = await response.json();
      getDataUsers();
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error(error);
    };
  }

  return (
    <estadologinGlobal.Provider value={{ perfil, isLogin, login, logout, getDataUsers, dataUsers, deleteUser }}>
      {children}
    </estadologinGlobal.Provider>
  )
}