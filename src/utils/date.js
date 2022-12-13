export const getDateStr = (dateStr) => (dateStr + "T").split("T")[0];

export const calcularEdad = (fecha) => {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
};

export const calcularTiempo = (fecha) => {
    var fin = new Date();
    var inicio = new Date(fecha);
    var tiempo = fin.getFullYear() - inicio.getFullYear();
    var m = fin.getMonth() - inicio.getMonth();

    if (m < 0 || (m === 0 && inicio.getDate() > fin.getDate())) {
        tiempo--;
    }

    return tiempo;
};