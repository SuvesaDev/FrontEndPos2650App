
const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 
                    'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
                'sesenta', 'setenta', 'ochenta', 'noventa'];
const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
                'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

export const numeroALetras = (numero) => {
    const newNumero = parseFloat(numero);
    const partes = newNumero.toFixed(2).split('.');
    const entero = parseInt(partes[0]);
    const decimal = parseInt(partes[1]);

    const letrasEntero = secciones(entero);
    const letrasDecimal = decimal > 0 ? `con ${secciones(decimal)} centavos` : '';

    const moneda = entero === 1 ? 'colón' : 'colones';

    return `${letrasEntero} ${moneda} ${letrasDecimal}`.trim();

}

const convertirGrupo = (n) => {

    let resultado = '';

    if (n === '100') return 'cien';

    const c = parseInt(n.charAt(0));
    const d = parseInt(n.charAt(1));
    const u = parseInt(n.charAt(2));

    if (c !== 0) resultado += centenas[c] + ' ';

    if (d === 1) {
      resultado += especiales[u];
    } else if (d === 2 && u !== 0) {
      resultado += 'veinti' + unidades[u];
    } else {
      if (d > 0) resultado += decenas[d];
      if (d > 2 && u > 0) resultado += ' y ';
      if (u > 0 && !(d === 2)) resultado += unidades[u];
    }

    return resultado.trim();

}

const secciones = (num) => {

    let n = ('000000000' + num).slice(-9);
    const millones = n.substr(0, 3);
    const miles = n.substr(3, 3);
    const cientos = n.substr(6, 3);

    let letras = '';

    if (parseInt(millones) > 0) {
      letras += convertirGrupo(millones) + ' millones ';
    }

    if (parseInt(miles) > 0) {
      letras += convertirGrupo(miles) + ' mil ';
    }

    if (parseInt(cientos) > 0) {
      letras += convertirGrupo(cientos);
    }

    return letras.trim();

}