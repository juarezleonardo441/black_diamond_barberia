// =============================================
// BLACK DIAMOND – Scripts
// =============================================

// --- WHATSAPP ---
function enviarWhatsApp() {
    const telefono = "5493875339326";
    const mensaje = "¡Hola! Vi la página de Black Diamond y quiero reservar un turno para el servicio completo.";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// --- FAQ ACORDEÓN ---
document.querySelectorAll('.faq-pregunta').forEach(boton => {
    boton.addEventListener('click', () => {
        const itemActual = boton.parentElement;
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== itemActual) item.classList.remove('activo');
        });
        itemActual.classList.toggle('activo');
    });
});

// --- SELECTOR DE ESTRELLAS ---
let estrellaSeleccionada = 0;

document.querySelectorAll('.estrella-btn').forEach(estrella => {
    estrella.addEventListener('click', () => {
        estrellaSeleccionada = parseInt(estrella.dataset.valor);
        actualizarEstrellas(estrellaSeleccionada);
    });

    estrella.addEventListener('mouseenter', () => {
        actualizarEstrellas(parseInt(estrella.dataset.valor));
    });

    estrella.addEventListener('mouseleave', () => {
        actualizarEstrellas(estrellaSeleccionada);
    });
});

function actualizarEstrellas(valor) {
    document.querySelectorAll('.estrella-btn').forEach(e => {
        e.classList.toggle('activa', parseInt(e.dataset.valor) <= valor);
    });
}

// --- PUBLICAR RESEÑA ---
function enviarResena() {
    const nombre = document.getElementById('inputNombre').value.trim();
    const texto = document.getElementById('inputTexto').value.trim();

    if (!nombre || !texto || estrellaSeleccionada === 0) {
        alert('Por favor completá tu nombre, el comentario y seleccioná una puntuación.');
        return;
    }

    // Crear las iniciales para el avatar
    const iniciales = nombre.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

    // Construir las estrellas en texto
    const estrellasTexto = '★'.repeat(estrellaSeleccionada) + '☆'.repeat(5 - estrellaSeleccionada);

    // Crear la nueva card de reseña
    const nuevaResena = document.createElement('div');
    nuevaResena.classList.add('resena-card', 'glass-card');
    nuevaResena.style.animation = 'animate-fadein 0.5s ease-out forwards';
    nuevaResena.innerHTML = `
        <div class="resena-header">
            <div class="avatar">${iniciales}</div>
            <div>
                <p class="resena-nombre">${nombre}</p>
                <div class="estrellas" style="color:${estrellaSeleccionada >= 4 ? '#d4af37' : '#888'}">${estrellasTexto}</div>
            </div>
        </div>
        <p class="resena-texto">"${texto}"</p>
    `;

    // Insertar al principio del wrapper
    const wrapper = document.getElementById('resenasWrapper');
    wrapper.insertBefore(nuevaResena, wrapper.firstChild);

    // Mostrar mensaje de éxito y limpiar form
    const form = document.getElementById('formResena');
    form.innerHTML = '<p class="resena-exito">✅ ¡Gracias por tu reseña! Ya aparece arriba.</p>';
}