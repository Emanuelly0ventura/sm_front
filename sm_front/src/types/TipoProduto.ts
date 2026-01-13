import type { TipoMovel } from "./TipoMovel";

export type TipoProduto = {
    id: string;
    movel: TipoMovel;
    nomeMovel:string;
    preco: number;
    descricao: string;
    
};