import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function AdministracaoPratos() {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(res => {
                setPratos(res.data);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const excluir = (pratoAHSerExcluido : IPrato) =>{
        http.delete(`restaurantes/${pratoAHSerExcluido.id}/`)
        .then(() => {
            const listaPratos = pratos.filter(prato => prato.id !== pratoAHSerExcluido.id)
            setPratos([...listaPratos])
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
                            Tag
                        </TableCell>

                        <TableCell>
                            Imagem
                        </TableCell>

                        <TableCell>
                            Editar
                        </TableCell>

                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato =>
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>

                            <TableCell>
                                {prato.tag}
                            </TableCell>

                            <TableCell>
                               [<a href={prato.imagem} target="blank" rel="noreferrer">Ver imagem</a>]
                            </TableCell>
                            
                            <TableCell>
                                [ <Link to={`/admin/pratos/${prato.id}`}> Editar </Link>]
                            </TableCell>

                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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