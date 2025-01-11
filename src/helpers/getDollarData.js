import { suvesaApi } from '../api';

export const getDollarData = async () => {
    try {
        const { data } = await suvesaApi.post('/moneda/ObtenerTipoCambio')//indicadores/tc/dolar');
        const { valorVenta } = data.responses;
        
        return valorVenta;

    } catch (error) {
        console.log({ error });
    }
}