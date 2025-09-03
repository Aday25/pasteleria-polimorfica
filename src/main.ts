// Clase base Tarta: abstracta, no se puede instanciar directamente
abstract class Tarta {
  public sabor: string;
  public imagen: string;

  constructor(sabor: string, imagen: string) {
    this.sabor = sabor;
    this.imagen = imagen;
  }

  // Método que cada tarta concreta debe implementar
  abstract hornear(): string;

  // Método protegido para ingredientes específicos de cada tarta
  protected abstract ingredientesEspecificos(): string[];

  // Devuelve todos los ingredientes: comunes + específicos
  ingredientes(): string[] {
    const base = ["Harina", "Huevos", "Azúcar"];
    return [...base, ...this.ingredientesEspecificos()];
  }

  // Getter para obtener el nombre de la tarta
  get nombre(): string {
    return `Tarta de ${this.sabor}`;
  }
}

// Clases concretas de tartas
class TartaChocolate extends Tarta {
  constructor() { super("chocolate", "/chocolate.png"); }
  hornear(): string { return `🍫 ${this.nombre}: horneando… ¡Lista!`; }
  protected ingredientesEspecificos(): string[] { return ["Cacao", "Mantequilla"]; }
}

class TartaFresa extends Tarta {
  constructor() { super("fresa", "/fresa.png"); }
  hornear(): string { return `🍓 ${this.nombre}: horneando… ¡Lista!`; }
  protected ingredientesEspecificos(): string[] { return ["Fresas frescas", "Nata"]; }
}

class TartaQueso extends Tarta {
  constructor() { super("queso", "/queso.png"); }
  hornear(): string { return `🧀 ${this.nombre}: horneando… ¡Lista!`; }
  protected ingredientesEspecificos(): string[] { return ["Queso crema", "Galletas trituradas"]; }
}

class TartaLimon extends Tarta {
  constructor() { super("limón", "/limon.png"); }
  hornear(): string { return `🍋 ${this.nombre}: horneando… ¡Lista!`; }
  protected ingredientesEspecificos(): string[] { return ["Limón", "Ralladura de limón"]; }
}



// Array de tartas inicial vacío
const tartas: Tarta[] = [
  new TartaLimon()
];

// Referencias al DOM
const lista = document.getElementById('lista') as HTMLDivElement;
const resultados = document.getElementById('resultados') as HTMLUListElement;

// Renderiza las tartas en la web
function renderLista(): void {
  lista.innerHTML = tartas
    .map((t, i) => `
      <article class="card">
        <img src="${t.imagen}" alt="${t.nombre}" class="foto"/>
        <h3>${t.nombre}</h3>
        <p><strong>Ingredientes:</strong> ${t.ingredientes().join(", ")}</p>
        <button class="btn-primary" data-index="${i}">Hornear</button>
      </article>
    `).join('');

  // Eventos para cada botón "Hornear"
  document.querySelectorAll<HTMLButtonElement>('.card .btn-primary').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      pushResultado(tartas[idx].hornear());
    });
  });
}

// Añade un resultado a la lista
function pushResultado(texto: string): void {
  const li = document.createElement('li');
  li.textContent = texto;
  resultados.prepend(li);
}

// Botón "Añadir tarta"
const btnAdd = document.getElementById('btn-add') as HTMLButtonElement;
btnAdd.addEventListener('click', () => {
  const select = document.getElementById('tipo') as HTMLSelectElement;
  const nueva = crearTarta(select.value);
  tartas.push(nueva);
  renderLista();
});

// Botón "Hornear todas"
const btnHornearTodas = document.getElementById('btn-hornear-todas') as HTMLButtonElement;
btnHornearTodas.addEventListener('click', () => {
  tartas.forEach((t) => pushResultado(t.hornear()));
});

// Crea una nueva tarta según el tipo
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

// Primer render (lista vacía)
renderLista();
