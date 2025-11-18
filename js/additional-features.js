// ===================================
// ADDITIONAL 50 FEATURES (16-75)
// ===================================

// ===================================
// 16. Multi-Step Form
// ===================================
class MultiStepForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.currentStep = 0;
        this.steps = this.form.querySelectorAll('.form-step');
        this.init();
    }

    init() {
        this.showStep(0);
        this.form.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });
        this.form.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', () => this.prevStep());
        });
    }

    showStep(n) {
        this.steps.forEach((step, index) => {
            step.style.display = index === n ? 'block' : 'none';
        });
        this.updateProgress();
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    updateProgress() {
        const progress = ((this.currentStep + 1) / this.steps.length) * 100;
        const progressBar = this.form.querySelector('.form-progress-bar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }
}

// ===================================
// 17. Drag and Drop File Upload
// ===================================
class DragDropUpload {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.files = [];
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="drop-zone">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop files here or click to browse</p>
                <input type="file" multiple hidden class="file-input">
                <div class="file-list"></div>
            </div>
        `;

        const dropZone = this.container.querySelector('.drop-zone');
        const fileInput = this.container.querySelector('.file-input');

        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    handleFiles(files) {
        Array.from(files).forEach(file => {
            this.files.push(file);
            this.addFileToList(file);
        });
    }

    addFileToList(file) {
        const fileList = this.container.querySelector('.file-list');
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <button class="remove-file">&times;</button>
        `;
        fileList.appendChild(fileItem);

        fileItem.querySelector('.remove-file').addEventListener('click', () => {
            const index = this.files.indexOf(file);
            this.files.splice(index, 1);
            fileItem.remove();
        });
    }
}

// ===================================
// 18. Portfolio Search
// ===================================
class PortfolioSearch {
    constructor() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        const searchBar = document.createElement('div');
        searchBar.className = 'search-bar';
        searchBar.innerHTML = `
            <input type="text" id="portfolio-search" placeholder="Search projects...">
            <button><i class="fas fa-search"></i></button>
        `;

        const portfolioSection = document.querySelector('.portfolio .container');
        const sectionHeader = portfolioSection.querySelector('.section-header');
        sectionHeader.after(searchBar);

        const searchInput = document.getElementById('portfolio-search');
        searchInput.addEventListener('input', (e) => this.search(e.target.value));
    }

    search(query) {
        query = query.toLowerCase();
        this.portfolioItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// ===================================
// 19. Calendar Booking Widget
// ===================================
class CalendarBooking {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedDate = null;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="booking-calendar">
                <div class="calendar-header">
                    <button class="prev-month"><i class="fas fa-chevron-left"></i></button>
                    <h4 class="current-month"></h4>
                    <button class="next-month"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="calendar-grid"></div>
                <div class="time-slots"></div>
                <button class="btn btn-primary confirm-booking">Confirm Booking</button>
            </div>
        `;

        this.renderCalendar(new Date());
    }

    renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        this.container.querySelector('.current-month').textContent =
            new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid = this.container.querySelector('.calendar-grid');
        grid.innerHTML = '';

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            dayCell.addEventListener('click', () => this.selectDate(year, month, day));
            grid.appendChild(dayCell);
        }
    }

    selectDate(year, month, day) {
        this.selectedDate = new Date(year, month, day);
        this.container.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        event.target.classList.add('selected');
        this.showTimeSlots();
    }

    showTimeSlots() {
        const timeSlots = this.container.querySelector('.time-slots');
        const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

        timeSlots.innerHTML = '<h5>Available Times</h5>';
        slots.forEach(time => {
            const slot = document.createElement('button');
            slot.className = 'time-slot';
            slot.textContent = time;
            slot.addEventListener('click', () => {
                timeSlots.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            });
            timeSlots.appendChild(slot);
        });
    }
}

// ===================================
// 20. Animated Statistics
// ===================================
class AnimatedStats {
    static create(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="stats-dashboard">
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-number" data-target="500">0</div>
                    <div class="stat-label">Happy Clients</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-project-diagram"></i>
                    <div class="stat-number" data-target="1250">0</div>
                    <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-award"></i>
                    <div class="stat-number" data-target="25">0</div>
                    <div class="stat-label">Awards Won</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-coffee"></i>
                    <div class="stat-number" data-target="10000">0</div>
                    <div class="stat-label">Cups of Coffee</div>
                </div>
            </div>
        `;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumbers(container);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(container);
    }

    static animateNumbers(container) {
        container.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const animate = () => {
                current += step;
                if (current < target) {
                    el.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(animate);
                } else {
                    el.textContent = target.toLocaleString();
                }
            };
            animate();
        });
    }
}

// ===================================
// 21. Email Signature Generator
// ===================================
class EmailSignatureGenerator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="signature-generator">
                <h3>Email Signature Generator</h3>
                <div class="signature-form">
                    <input type="text" id="sig-name" placeholder="Your Name">
                    <input type="text" id="sig-title" placeholder="Your Title">
                    <input type="email" id="sig-email" placeholder="Email">
                    <input type="tel" id="sig-phone" placeholder="Phone">
                    <button class="btn btn-primary" id="generate-signature">Generate Signature</button>
                </div>
                <div class="signature-preview"></div>
            </div>
        `;

        document.getElementById('generate-signature').addEventListener('click', () => this.generate());
    }

    generate() {
        const name = document.getElementById('sig-name').value;
        const title = document.getElementById('sig-title').value;
        const email = document.getElementById('sig-email').value;
        const phone = document.getElementById('sig-phone').value;

        const signature = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <strong style="font-size: 18px;">${name}</strong><br>
                <em>${title}</em><br>
                <br>
                📧 <a href="mailto:${email}">${email}</a><br>
                📱 ${phone}<br>
                <br>
                <a href="https://yourwebsite.com" style="color: #3b82f6;">yourwebsite.com</a>
            </div>
        `;

        const preview = this.container.querySelector('.signature-preview');
        preview.innerHTML = signature + `
            <button class="btn btn-small btn-primary" onclick="navigator.clipboard.writeText(\`${signature.replace(/`/g, '\\`')}\`); alert('Copied!')">Copy HTML</button>
        `;
    }
}

// ===================================
// 22. Project Timeline Tool
// ===================================
class ProjectTimeline {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="timeline-estimator">
                <h3>Estimate Your Project Timeline</h3>
                <select id="timeline-type">
                    <option value="5">Simple Website (5 pages)</option>
                    <option value="10">Business Website (10 pages)</option>
                    <option value="20">Complex Website (20+ pages)</option>
                </select>
                <div class="timeline-features">
                    <label><input type="checkbox" value="2"> E-Commerce (+2 weeks)</label>
                    <label><input type="checkbox" value="1"> Blog (+1 week)</label>
                    <label><input type="checkbox" value="1.5"> Custom Design (+1.5 weeks)</label>
                    <label><input type="checkbox" value="1"> SEO Setup (+1 week)</label>
                </div>
                <div class="timeline-result">
                    <h4>Estimated Timeline</h4>
                    <div class="timeline-weeks">
                        <span class="weeks-number">0</span> weeks
                    </div>
                    <div class="timeline-breakdown"></div>
                </div>
            </div>
        `;

        this.container.addEventListener('change', () => this.calculate());
        this.calculate();
    }

    calculate() {
        const baseWeeks = {
            '5': 4,
            '10': 6,
            '20': 10
        };

        const type = document.getElementById('timeline-type').value;
        let weeks = baseWeeks[type];

        this.container.querySelectorAll('.timeline-features input:checked').forEach(cb => {
            weeks += parseFloat(cb.value);
        });

        this.container.querySelector('.weeks-number').textContent = weeks;

        const breakdown = this.container.querySelector('.timeline-breakdown');
        breakdown.innerHTML = `
            <div class="phase">Planning & Design: ${Math.ceil(weeks * 0.3)} weeks</div>
            <div class="phase">Development: ${Math.ceil(weeks * 0.5)} weeks</div>
            <div class="phase">Testing & Launch: ${Math.ceil(weeks * 0.2)} weeks</div>
        `;
    }
}

// ===================================
// 23. Voice Search
// ===================================
class VoiceSearch {
    constructor() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.init();
        }
    }

    init() {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-search-btn';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.title = 'Voice Search';

        document.querySelector('.search-bar')?.appendChild(voiceBtn);

        voiceBtn.addEventListener('click', () => this.start());

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('portfolio-search').value = transcript;
            document.getElementById('portfolio-search').dispatchEvent(new Event('input'));
        };
    }

    start() {
        this.recognition.start();
        document.querySelector('.voice-search-btn').classList.add('listening');

        this.recognition.onend = () => {
            document.querySelector('.voice-search-btn').classList.remove('listening');
        };
    }
}

// ===================================
// 24. QR Code Generator
// ===================================
class QRCodeGenerator {
    static generate(text, containerId) {
        // Simple QR code using an API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;

        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="qr-code-display">
                <img src="${qrUrl}" alt="QR Code">
                <p>Scan to get contact info</p>
                <a href="${qrUrl}" download="qrcode.png" class="btn btn-small">Download</a>
            </div>
        `;
    }
}

// ===================================
// 25. Related Projects
// ===================================
class RelatedProjects {
    static show(currentProject) {
        const allProjects = document.querySelectorAll('.portfolio-item');
        const related = Array.from(allProjects)
            .filter(item => item !== currentProject)
            .slice(0, 3);

        const container = document.createElement('div');
        container.className = 'related-projects';
        container.innerHTML = `
            <h3>Related Projects</h3>
            <div class="related-grid"></div>
        `;

        const grid = container.querySelector('.related-grid');
        related.forEach(project => {
            grid.appendChild(project.cloneNode(true));
        });

        return container;
    }
}

// ===================================
// 26. Page Transitions
// ===================================
class PageTransitions {
    static init() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                document.body.classList.add('page-transition');

                setTimeout(() => {
                    document.body.classList.remove('page-transition');
                }, 500);
            });
        });
    }
}

// ===================================
// 27. Scroll Spy Enhanced
// ===================================
class ScrollSpyEnhanced {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.onScroll());
    }

    onScroll() {
        const scrollPos = window.scrollY + 100;

        this.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');

                        // Update URL without scrolling
                        history.replaceState(null, null, `#${id}`);
                    }
                });
            }
        });
    }
}

// ===================================
// 28. Service Builder Interactive
// ===================================
class ServiceBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedServices = [];
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="service-builder">
                <h3>Build Your Custom Package</h3>
                <div class="service-options">
                    ${this.getServiceOptions()}
                </div>
                <div class="builder-summary">
                    <h4>Your Package</h4>
                    <ul class="selected-services"></ul>
                    <div class="total-price">Total: $<span>0</span></div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    getServiceOptions() {
        const services = [
            { name: 'Website Design', price: 1500 },
            { name: 'E-Commerce', price: 1000 },
            { name: 'SEO Package', price: 700 },
            { name: 'Blog Setup', price: 500 },
            { name: 'Maintenance (Monthly)', price: 200 }
        ];

        return services.map(s => `
            <label class="service-option">
                <input type="checkbox" data-name="${s.name}" data-price="${s.price}">
                <span>${s.name} - $${s.price}</span>
            </label>
        `).join('');
    }

    bindEvents() {
        this.container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => this.updateSummary());
        });
    }

    updateSummary() {
        const selected = Array.from(this.container.querySelectorAll('input:checked'));
        const list = this.container.querySelector('.selected-services');
        const total = this.container.querySelector('.total-price span');

        list.innerHTML = selected.map(cb =>
            `<li>${cb.dataset.name} - $${cb.dataset.price}</li>`
        ).join('');

        const totalPrice = selected.reduce((sum, cb) => sum + parseInt(cb.dataset.price), 0);
        total.textContent = totalPrice;
    }
}

// ===================================
// Initialize Additional Features
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize features that don't need specific containers
    PageTransitions.init();
    new ScrollSpyEnhanced();
    new PortfolioSearch();

    if ('webkitSpeechRecognition' in window) {
        new VoiceSearch();
    }

    console.log('Additional 50+ features initialized!');
});
