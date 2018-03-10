import { Comentario } from "./comentario"


export interface Dish {
    id: number;
    nome: string;
    imagem: string;
    descricao: string;
    preco: string;
    rotulo: string;
    categoria: string;
    featured: boolean;
    comentario: Comentario[];
}

