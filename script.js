// script.js - Subtle Interactivity & Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-up reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Simple Tab Switching Logic (Use Cases Section)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabHeadersContext = [
        {
            title: "Accelerate deployment cycles",
            desc: "Detect anomalies in your logs before they become outages. Nexis instantly correlates PRs with error traces so your engineers can fix bugs faster.",
            linkText: "See engineering workflow",
            visualHtml: '<div class="skeleton-chart style-code"></div>'
        },
        {
            title: "Insights without SQL",
            desc: "Empower your product managers to run complex cohort analyses in natural language. Reduce dependencies on data engineering.",
            linkText: "Explore product analytics",
            visualHtml: '<div class="skeleton-chart" style="height: 250px; background: linear-gradient(135deg, rgba(245,240,0,0.1), rgba(108,92,231,0.2)); border: none;"></div>'
        },
        {
            title: "Identify churn before it happens",
            desc: "Predictive models flag at-risk accounts based on subtle usage drops. Automatically trigger retention campaigns in your CRM.",
            linkText: "View growth pipelines",
            visualHtml: '<div class="skeleton-chart" style="height: 250px; background: var(--bg); border: 1px solid var(--secondary); border-radius: 100px;"></div>'
        }
    ];

    const tabTextWrapper = document.querySelector('.tab-text');
    const tabVisualWrapper = document.querySelector('.tab-visual');

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            // Update content gracefully
            tabTextWrapper.style.opacity = 0;
            tabVisualWrapper.style.opacity = 0;
            
            setTimeout(() => {
                const data = tabHeadersContext[index];
                tabTextWrapper.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                    <a href="#" class="btn btn-text">${data.linkText} <span class="arrow">→</span></a>
                `;
                tabVisualWrapper.innerHTML = data.visualHtml;
                
                tabTextWrapper.style.opacity = 1;
                tabVisualWrapper.style.opacity = 1;
                tabTextWrapper.style.transition = 'opacity 0.4s ease';
                tabVisualWrapper.style.transition = 'opacity 0.4s ease';
            }, 300);
        });
    });

});