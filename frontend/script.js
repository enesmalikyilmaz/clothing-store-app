const API = 'http://localhost:5000/api';

function register() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => {
      alert('Kayıt başarılı, şimdi giriş yapın.');
      document.getElementById('register').classList.add('hidden');
      document.getElementById('login').classList.remove('hidden');
    });
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        showMessage('Giriş başarılı!');
        document.getElementById('login').classList.add('hidden');
        document.getElementById('panel').classList.remove('hidden');
      } else {
        alert('Giriş başarısız');
      }
    });
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}

function addCategory() {
  const name = document.getElementById('catName').value;
  const description = document.getElementById('catDesc').value;

  fetch(`${API}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, description })
  })
    .then(res => res.json())
    .then(data => showMessage('Kategori eklendi.'));
}

function listCategories() {
  fetch(`${API}/categories`)
    .then(res => res.json())
    .then(data => showMessage(`<b>Kategoriler:</b><br>` + data.map(cat => `${cat.description} - ${cat.name}`).join('<br>')));
}

function addProduct() {
  const name = document.getElementById('prodName').value;
  const description = document.getElementById('prodDesc').value;
  const price = Number(document.getElementById('prodPrice').value);
  const stock = Number(document.getElementById('prodStock').value);
  const image = document.getElementById('prodImage').value;
  const category = document.getElementById('prodCategory').value;

  fetch(`${API}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, description, price, stock, image, category })
  })
    .then(res => res.json())
    .then(data => showMessage('Ürün eklendi.'));
}

function listProducts() {
  fetch(`${API}/products`)
    .then(res => res.json())
    .then(data => showMessage(`<b>Ürünler:</b><br>` + data.map(p => `${p.name} - ₺${p.price}`).join('<br>')));
}

function showMessage(msg) {
  document.getElementById('output').innerHTML = msg;
}