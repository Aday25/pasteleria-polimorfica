/*

// 1) Modelo de dominio con polimorfismo y herencia de ingredientes

// Clase abstracta: no se puede instanciar directamente, solo sirve como base
abstract class Tarta {

  // Declaramos las propiedades de la clase
  public sabor: string;
  public imagen: string;

  // Constructor: asignamos los valores
  constructor(sabor: string, imagen: string) {
    this.sabor = sabor;
    this.imagen = imagen;
  }

  // Método abstracto: cada clase hija debe implementar su propio hornear()
  abstract hornear(): string;

  // Método abstracto protegido: solo accesible desde la clase y sus hijas
  protected abstract ingredientesEspecificos(): string[];

  // Método concreto que devuelve todos los ingredientes
  ingredientes(): string[] {
    const base = ["Harina", "Huevos", "Azúcar"];
    return [...base, ...this.ingredientesEspecificos()];
  }

  // Getter: permite acceder a this.nombre como si fuera propiedad
  get nombre(): string {
    return `Tarta de ${this.sabor}`;
  }
}

// -------------------- CLASES CONCRETAS --------------------
class TartaChocolate extends Tarta {
  constructor() { super("chocolate", "/chocolate.png"); }
  hornear(): string {
    return `🍫 ${this.nombre}: mezclando cacao… Horneando a 180ºC durante 30 min. ¡Lista!`;
  }
  protected ingredientesEspecificos(): string[] {
    return ["Cacao", "Mantequilla"];
  }
}

class TartaFresa extends Tarta {
  constructor() { super("fresa", "/fresa.png"); }
  hornear(): string {
    return `🍓 ${this.nombre}: base esponjosa… Horneando a 170ºC durante 25 min. ¡Lista!`;
  }
  protected ingredientesEspecificos(): string[] {
    return ["Fresas frescas", "Nata"];
  }
}

class TartaQueso extends Tarta {
  constructor() { super("queso", "/queso.png"); }
  hornear(): string {
    return `🧀 ${this.nombre}: baño María… Horneando a 160ºC durante 40 min. ¡Lista!`;
  }
  protected ingredientesEspecificos(): string[] {
    return ["Queso crema", "Galletas trituradas"];
  }
}

class TartaLimon extends Tarta {
  constructor() { super("limón", "/limon.png"); }
  hornear(): string {
    return `🍋 ${this.nombre}: ralladura de limón… Horneando a 175ºC durante 28 min. ¡Lista!`;
  }
  protected ingredientesEspecificos(): string[] {
    return ["Limón", "Ralladura de limón"];
  }
}

class TartaZanahoria extends Tarta {
  constructor() { super("zanahoria", "/zanahoria.png"); }
  hornear(): string {
    return `🥕 ${this.nombre}: mezclando zanahoria rallada… Horneando a 180ºC durante 35 min. ¡Lista!`;
  }
  protected ingredientesEspecificos(): string[] {
    return ["Zanahoria", "Nueces"];
  }
}

// -------------------- ESTADO INICIAL --------------------
const tartas: Tarta[] = [];

// -------------------- REFERENCIAS AL DOM --------------------
const lista = document.getElementById('lista') as HTMLDivElement;
const resultados = document.getElementById('resultados') as HTMLUListElement;

// -------------------- FUNCIONES --------------------
function renderLista(): void {
  lista.innerHTML = tartas
    .map(
      (t, i) => `
      <article class="card">
        <img src="${t.imagen}" alt="${t.nombre}" class="foto"/>
        <h3>${t.nombre}</h3>
        <p><small>Clase: <code>${t.constructor.name}</code></small></p>
        <p><strong>Ingredientes:</strong> ${t.ingredientes().join(", ")}</p>
        <button class="btn-primary" data-index="${i}">Hornear</button>
      </article>`
    )
    .join('');

  document.querySelectorAll<HTMLButtonElement>('.card .btn-primary').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      const mensaje = tartas[idx].hornear();
      pushResultado(mensaje);
    });
  });
}

function pushResultado(texto: string): void {
  const li = document.createElement('li');
  li.textContent = texto;
  resultados.prepend(li);
}

// -------------------- BOTONES --------------------
const btnAdd = document.getElementById('btn-add') as HTMLButtonElement;
btnAdd.addEventListener('click', () => {
  const select = document.getElementById('tipo') as HTMLSelectElement;
  const tipo = select.value;
  const nueva = crearTarta(tipo);
  tartas.push(nueva);
  renderLista();
});

const btnHornearTodas = document.getElementById('btn-hornear-todas') as HTMLButtonElement;
btnHornearTodas.addEventListener('click', () => {
  tartas.forEach((t) => pushResultado(t.hornear()));
});

function crearTarta(tipo: string): Tarta {
  switch (tipo) {
    case 'chocolate': return new TartaChocolate();
    case 'fresa': return new TartaFresa();
    case 'queso': return new TartaQueso();
    case 'limon': return new TartaLimon();
    case 'zanahoria': return new TartaZanahoria();
    default: return new TartaChocolate();
  }
}

// -------------------- PRIMER RENDER --------------------
renderLista();

*/
