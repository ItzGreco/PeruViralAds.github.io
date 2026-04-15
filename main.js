// Efecto Scroll para el Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer para animaciones en scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Activar cuando el 15% del elemento sea visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Dejar de observar una vez que ya se animó para mejor rendimiento
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos con clases de animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
});

// Lógica del Modal del Portafolio
const modal = document.getElementById('portfolioModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalGrid = document.getElementById('modalVideoGrid');

const portfolioData = {
    'spots': {
        title: 'Spots Publicitarios',
        subtitle: 'Comercial Arroz El Moshaco.',
        items: [
            { type: 'iframe', url: 'https://drive.google.com/file/d/1rCJDzEvsVsspTlB8Qh8ikzjT0PFsp3ov/preview' }
        ]
    },
    'reels': {
        title: 'Shorts & Reels',
        subtitle: 'Reel Vertical / Moda.',
        items: [
            { type: 'iframe', url: 'https://drive.google.com/file/d/1iQ4_iFYKLJR67fLBNFoEM3K2uEQJpcY9/preview' }
        ]
    },
    'corporativos': {
        title: 'Videos Corporativos',
        subtitle: 'Corporativo e Institucional.',
        items: [
            { type: 'iframe', url: 'https://drive.google.com/file/d/1lITijJfpa2gE_OZqzIrF4FCClV5cREqJ/preview' }
        ]
    }
};

function openPortfolioModal(category) {
    const data = portfolioData[category];
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    
    // Limpiar grid anterior
    modalGrid.innerHTML = '';
    
    // Inyectar directamente los reproductores de video (iFrames)
    data.items.forEach((item) => {
        const div = document.createElement('div');
        div.style.width = '100%';
        div.style.aspectRatio = "16/9";
        div.style.borderRadius = "12px";
        div.style.overflow = "hidden";
        div.style.backgroundColor = "#0a0a0e"; // fondo oscuro mientras carga
        
        if (item.type === 'iframe') {
            div.innerHTML = `<iframe src="${item.url}" width="100%" height="100%" allow="autoplay" allowfullscreen style="border: none;"></iframe>`;
        }
        
        modalGrid.appendChild(div);
    });
    
    modal.style.display = 'block';
    // Ocultar la barra de scroll de la página principal para enfocarse en el modal
    document.body.style.overflow = 'hidden'; 
}

function closePortfolioModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar comportamiento de scroll
    // Limpiar el contenido del modal para detener la reproducción de audio/video en segundo plano
    modalGrid.innerHTML = '';
}

// Cerrar modal si el usuario hace clic en el espacio oscuro de fondo
window.onclick = function(event) {
    if (event.target == modal) {
        closePortfolioModal();
    }
}
