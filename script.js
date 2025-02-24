// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
  });
  
  // Navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenuContainer = document.querySelector('.nav-menu-container');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Toggle menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenuContainer.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenuContainer.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && 
        !navMenuContainer.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenuContainer.classList.remove('active');
    }
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
  
  // Modal functionality
  const modal = document.getElementById('productModal');
  const modalImage = modal.querySelector('.product-image img');
  const modalTitle = modal.querySelector('.product-title');
  const modalPrice = modal.querySelector('.amount');
  const modalDescription = modal.querySelector('.product-description');
  const modalShopBtn = modal.querySelector('.btn-shop');
  const closeBtn = modal.querySelector('.modal-close');
  const closeModalBtn = modal.querySelector('[data-close]');
  const productCards = document.querySelectorAll('.product-card');
  
  // Product data
  const products = {
    'Bamboo Side Bag': {
        price: '180.00',
        link: 'https://paystack.shop/isaac-eco-bamboo/bamboo-side-bag',
        description: 'A stylish and practical side bag made from sustainable bamboo. Perfect for everyday use, this bag combines traditional craftsmanship with modern design.'
    },
    'Bamboo School Bag': {
        price: '150.00',
        link: 'https://paystack.shop/isaac-eco-bamboo/bamboo-school-bag',
        description: 'Durable and eco-friendly school bag designed for students. Features comfortable straps and multiple compartments for books and supplies.'
    },
    'Bamboo Traveling Bag': {
        price: '250.00',
        link: 'https://paystack.shop/isaac-eco-bamboo/bamboo-traveling-bag',
        description: 'Spacious and elegant traveling bag perfect for weekend getaways. Made with premium bamboo material for durability and style.'
    },
    'Bamboo Art Fan': {
        price: '80.00',
        link: 'https://paystack.shop/isaac-eco-bamboo/bamboo-art-fan',
        description: 'Beautiful hand-crafted bamboo fan featuring intricate traditional designs. A perfect blend of art and functionality.'
    },
    'Bamboo Hand Bag': {
        price: '200.00',
        link: 'https://paystack.shop/isaac-eco-bamboo/bamboo-hand-bag',
        description: 'Elegant handbag crafted from premium bamboo. Features a unique design pattern and comfortable handles for everyday use.'
    }
  };
  
  // Open modal function
  function openModal(image, title) {
    const product = products[title];
    
    modalImage.src = image;
    modalTitle.textContent = title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;
    
    // Update shop now button
    modalShopBtn.onclick = () => window.open(product.link, '_blank');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Add click event listeners to all view details buttons
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const image = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        openModal(image, title);
    });
  });
  
  // Add click event listeners to all shop now buttons
  document.querySelectorAll('.shop-now').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const title = card.querySelector('h3').textContent;
        window.open(products[title].link, '_blank');
    });
  });
  
  // Close modal with close button
  closeBtn.addEventListener('click', closeModal);
  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
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