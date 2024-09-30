export interface Transaccion {
    id: string;        // ID único de la transacción
    fondoId: string;   // ID del fondo asociado
    tipo: string;      // Tipo de transacción (ej. APERTURA, CANCELACION)
    monto: number;     // Monto de la transacción
    fecha: string;     // Fecha de la transacción en formato ISO
    clienteId: string; // ID del cliente asociado a la transacción
    nombreFondo?: string;
  }
  