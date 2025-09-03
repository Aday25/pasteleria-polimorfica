// src/ejemplos/ingredientes-sin-herencia.ts

/**
 * 🔴 VERSIÓN ANTIGUA: SIN HERENCIA
 * Ingredientes repetidos en cada clase
 * Este archivo NO está vinculado a la aplicación,
 * solo lo usamos como ejemplo para comparar en clase.
 */

abstract class Tarta {
  
  public sabor: string;
  public imagen: string;

  constructor(sabor: string, imagen: string) {
    this.sabor = sabor;
    this.imagen = imagen;
  }
  abstract hornear(): string;
  abstract ingredientes(): string[];
  get nombre(): string {
    return `Tarta de ${this.sabor}`;
  }
}

class TartaChocolate extends Tarta {
  constructor() {
    super("chocolate", "/chocolate.png");
  }
  hornear(): string {
    return `🍫 ${this.nombre} horneada a 180ºC`;
  }
  ingredientes(): string[] {
    return ["Harina", "Huevos", "Azúcar", "Cacao", "Mantequilla"];
  }
}

class TartaFresa extends Tarta {
  constructor() {
    super("fresa", "/fresa.png");
  }
  hornear(): string {
    return `🍓 ${this.nombre} horneada a 170ºC`;
  }
  ingredientes(): string[] {
    return ["Harina", "Huevos", "Azúcar", "Fresas"];
  }
}

class TartaQueso extends Tarta {
  constructor() {
    super("queso", "/queso.png");
  }
  hornear(): string {
    return `🧀 ${this.nombre} horneada a 160ºC`;
  }
  ingredientes(): string[] {
    return ["Harina", "Huevos", "Azúcar", "Queso crema"];
  }
}
