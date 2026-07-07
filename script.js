/* =========================================================
   Ateliê de Terços — Lógica do carrinho e interações
   (lógica do carrinho e WhatsApp preservadas)
   ========================================================= */

let carrinho = [];
let total = 0;

function toggleCarrinho() {
    const sidebar = document.getElementById('sidebar-cart');
    sidebar.classList.toggle('open');
}

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();

    const sidebar = document.getElementById('sidebar-cart');
    if (!sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
    }
}

function atualizarCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.innerText = carrinho.length;
    cartItems.innerHTML = '';
    total = 0;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
        cartTotal.innerText = 'R$ 0,00';
        return;
    }

    carrinho.forEach((item, index) => {
        total += item.preco;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div>
                <h4>${item.nome}</h4>
                <small>R$ ${item.preco.toFixed(2)}</small>
            </div>
            <button onclick="removerDoCarrinho(${index})" aria-label="Remover item">&times;</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.innerText = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const numeroWhatsapp = "5515997542223";

    let message = "Olá! Gostaria de encomendar os seguintes terços:\n\n";
    carrinho.forEach(item => {
        message += `- ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
    });
    message += `\n*Total:* R$ ${total.toFixed(2)}`;

    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(message)}`;
    window.open(linkWhatsapp, '_blank');
}

/* ---------- Modal de imagem ---------- */
function expandirImagem(imgElement) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('img-expanded');

    modal.style.display = 'flex';
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt || 'Imagem ampliada';
    document.body.style.overflow = 'hidden';
}

function fecharImagem() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('img-expanded');

    modal.style.display = 'none';
    modalImg.src = '';
    document.body.style.overflow = '';
}

/* ---------- Filtro de categorias ---------- */
function filtrar(categoria, botao) {
    const produtos = document.querySelectorAll(".product-card");
    const botoes = document.querySelectorAll(".filtro-btn");

    botoes.forEach(btn => btn.classList.remove("active"));
    botao.classList.add("active");

    produtos.forEach(produto => {
        if (categoria === "todos") {
            produto.style.display = "block";
        } else {
            produto.style.display = produto.classList.contains(categoria)
                ? "block"
                : "none";
        }
    });
}
/* Fechar o modal com tecla ESC */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharImagem();
});
