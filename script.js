// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
  });
  
  // Navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenuContainer = document.querySelector('.nav-menu-container');
  
  navToggle.addEventListener('click', () => {
    navMenuContainer.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
  
  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;
  
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  
  // Auto advance slides
  setInterval(() => showSlide(currentSlide + 1), 5000);
  
  // Product Modal
  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.getElementById('modalPrice');
  const closeModal = document.querySelector('.close-modal');
  const shopNowBtn = document.querySelector('.shop-now-btn');
  
  const products = [
    {
        title: 'Bamboo Vase',
        image: 'https://images.unsplash.com/photo-1598293868473-3c2372ad8edc?auto=format&fit=crop&q=80',
        description: 'Hand-crafted bamboo vase featuring intricate patterns and natural finish. Perfect for modern and traditional spaces alike.',
        price: '$129.99',
        paystackUrl: 'https://paystack.shop/bamboo-art-vase'
    },
    {
        title: 'Wall Art',
        image: 'https://images.unsplash.com/photo-1596306499317-8490232098fa?auto=format&fit=crop&q=80',
        description: 'Contemporary bamboo wall art that brings nature indoors. Each piece is uniquely designed and carefully assembled.',
        price: '$249.99',
        paystackUrl: 'https://paystack.shop/bamboo-art-wall'
    },
    {
        title: 'Bamboo Lamp',
        image: 'https://images.unsplash.com/photo-1533228705496-072ca298b122?auto=format&fit=crop&q=80',
        description: 'Modern bamboo lamp with ambient lighting. Combines traditional craftsmanship with contemporary design.',
        price: '$179.99',
        paystackUrl: 'https://paystack.shop/bamboo-art-lamp'
    },
    {
      title: 'Bamboo Lamp',
      image: 'https://images.unsplash.com/photo-1533228705496-072ca298b122?auto=format&fit=crop&q=80',
      description: 'Modern bamboo lamp with ambient lighting. Combines traditional craftsmanship with contemporary design.',
      price: '$179.99',
      paystackUrl: 'https://paystack.shop/bamboo-art-lamp'
  }
  ];
  
  let currentProductIndex = 0;
  
  document.querySelectorAll('.view-details').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentProductIndex = index;
        modalImage.src = products[index].image;
        modalTitle.textContent = products[index].title;
        modalDescription.textContent = products[index].description;
        modalPrice.textContent = products[index].price;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
  });
  
  shopNowBtn.addEventListener('click', () => {
    const product = products[currentProductIndex];
    window.open(product.paystackUrl, '_blank');
  });
  
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
  });
  
  // Horizontal scroll for products
  const productsSlider = document.querySelector('.products-slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  productsSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - productsSlider.offsetLeft;
    scrollLeft = productsSlider.scrollLeft;
  });
  
  productsSlider.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  productsSlider.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  productsSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - productsSlider.offsetLeft;
    const walk = (x - startX) * 2;
    productsSlider.scrollLeft = scrollLeft - walk;
  });
  
  // Active navigation highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
  
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
  });