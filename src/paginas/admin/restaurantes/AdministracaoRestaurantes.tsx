import IRestaurante from "../../../interfaces/IRestaurante";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

export default function AdministracaoRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(res => {
                setRestaurantes(res.data);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const excluir = (restauramteAHSerExcluido : IRestaurante) =>{
        http.delete(`restaurantes/${restauramteAHSerExcluido.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauramteAHSerExcluido.id)
            setRestaurantes([...listaRestaurante])
        })
    }



    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}> Editar </Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>

        </TableContainer>
    )
}