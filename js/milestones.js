// Milestones data
const milestonesData = [
    {
        id: 'proposal',
        title: 'Project Proposal',
        date: 'August 2024',
        description: 'A Project Proposal is presented to potential sponsors or clients to receive funding or get your project approved.',
        marks: 6,
        progress: 6,
        completed: true
    },
    {
        id: 'progress1',
        title: 'Progress Presentation I',
        date: 'December 2024',
        description: 'Reviews the 50% completion status of the project. This reveals any gaps or inconsistencies in the design/requirements.',
        marks: 6,
        progress: 6,
        completed: true
    },
    {
        id: 'research-paper',
        title: 'Research Paper',
        date: 'March 2025',
        description: 'Describes what you contribute to existing knowledge, giving due recognition to all work that you referred to in making new knowledge.',
        marks: 10,
        progress: 10,
        completed: true
    },
    {
        id: 'progress2',
        title: 'Progress Presentation II',
        date: 'March 2025',
        description: 'Reviews the 90% completion status demonstration of the project. Includes a Poster presentation which describes the project as a whole.',
        marks: 18,
        progress: 18,
        completed: true
    },
    {
        id: 'website',
        title: 'Website Assessment',
        date: 'June 2025',
        description: 'The Website helps to promote our research project and reveals all details related to the project.',
        marks: 2,
        progress: 2,
        completed: false
    },
    {
        id: 'logbook',
        title: 'Logbook',
        date: 'June 2025',
        description: 'Status of the project is validated through the Logbook. This also includes Status documents 1 & 2.',
        marks: 3,
        progress: 3,
        completed: false
    },
    {
        id: 'final-report',
        title: 'Final Report',
        date: 'April 2025',
        description: 'Evaluates the completed project done throughout the year. Includes marks for Individual & group reports and also Final report.',
        marks: 19,
        progress: 19,
        completed: false
    },
    {
        id: 'viva',
        title: 'Final Presentation & Viva',
        date: 'May 2025',
        description: 'Viva is held individually to assess each member\'s contribution to the project.',
        marks: 20,
        progress: 20,
        completed: false
    }
];

// Calculate total marks
const totalMarks = milestonesData.reduce((sum, milestone) => sum + milestone.marks, 0);

// Create milestone element
function createMilestoneElement(milestone, index) {
    const element = document.createElement('section');
    element.className = `milestone-item ${milestone.completed ? 'completed' : ''}`;
    element.id = `milestone-${milestone.id}`;
    
    // Optionally, use different icons for types
    let icon = 'ellipsis-h';
    if (milestone.completed) icon = 'check';
    else if (milestone.id.includes('progress')) icon = 'chart-line';
    else if (milestone.id.includes('proposal')) icon = 'file-alt';
    else if (milestone.id.includes('report')) icon = 'file-signature';
    else if (milestone.id.includes('website')) icon = 'globe';
    else if (milestone.id.includes('viva')) icon = 'user-graduate';
    else if (milestone.id.includes('logbook')) icon = 'book';
    else if (milestone.id.includes('paper')) icon = 'file-medical-alt';

    const progressBarWidth = (milestone.progress / milestone.marks) * 100;
    
    element.innerHTML = `
        <header class="milestone-header" data-milestone="${milestone.id}" tabindex="0" role="button" aria-expanded="false" aria-controls="milestone-content-${milestone.id}">
            <span class="milestone-icon">
                <i class="fas fa-${icon}"></i>
            </span>
            <span class="milestone-title">
                <h3>${milestone.title}</h3>
                <span class="milestone-date">${milestone.date}</span>
            </span>
            <span class="milestone-toggle" aria-label="Expand milestone details">
                <i class="fas fa-chevron-down"></i>
            </span>
        </header>
        <div class="milestone-content" id="milestone-content-${milestone.id}" aria-hidden="true">
            <p>${milestone.description}</p>
            <div class="milestone-details">
                <div class="milestone-marks">
                    <span>Marks Allocated: <strong>${milestone.marks}</strong></span>
                    <span>Progress: <strong>${milestone.progress}/${milestone.marks}</strong></span>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 0%"
                         aria-valuenow="${milestone.progress}" aria-valuemin="0" aria-valuemax="${milestone.marks}">
                        ${milestone.progress}%
                    </div>
                </div>
            </div>
        </div>
        ${index < milestonesData.length - 1 ? '<div class="milestone-connector"></div>' : ''}
    `;

    // Toggle expand/collapse with animation and ARIA
    const header = element.querySelector('.milestone-header');
    const content = element.querySelector('.milestone-content');
    const toggleIcon = header.querySelector('.milestone-toggle i');
    header.addEventListener('click', () => {
        const isActive = element.classList.toggle('active');
        header.setAttribute('aria-expanded', isActive);
        content.setAttribute('aria-hidden', !isActive);
        toggleIcon.classList.toggle('fa-chevron-down', !isActive);
        toggleIcon.classList.toggle('fa-chevron-up', isActive);
        // Animate progress bar
        if (isActive) {
            const bar = element.querySelector('.progress-bar');
            setTimeout(() => {
                bar.style.width = `${progressBarWidth}%`;
            }, 150);
        } else {
            const bar = element.querySelector('.progress-bar');
            bar.style.width = `0%`;
        }
    });
    // Keyboard accessibility
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            header.click();
        }
    });
    return element;
}

// Initialize milestones for modern alternating timeline

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.timeline');
    if (!container) return;
    container.innerHTML = '';

    milestonesData.forEach((milestone, index) => {
        // Timeline event
        const event = document.createElement('div');
        event.className = 'timeline-event';

        // Icon (dot)
        const icon = document.createElement('div');
        icon.className = 'timeline-event-icon';
        event.appendChild(icon);

        // Card
        const copy = document.createElement('div');
        copy.className = 'timeline-event-copy';

        // Date
        const date = document.createElement('span');
        date.className = 'timeline-event-thumbnail';
        date.textContent = milestone.date;
        copy.appendChild(date);

        // Title
        const title = document.createElement('h3');
        title.textContent = milestone.title;
        copy.appendChild(title);

        // Description
        const desc = document.createElement('p');
        desc.textContent = milestone.description;
        copy.appendChild(desc);

        // Progress bar
        const progress = document.createElement('div');
        progress.className = 'progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        const percent = Math.round((milestone.progress / milestone.marks) * 100);
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '%';
        progress.appendChild(progressBar);
        copy.appendChild(progress);

        // Marks
        const marks = document.createElement('div');
        marks.style.marginTop = '0.5rem';
        marks.style.fontWeight = '600';
        marks.style.fontSize = '0.95rem';
        marks.textContent = 'Marks Allocated : ' + milestone.marks;
        copy.appendChild(marks);

        event.appendChild(copy);
        container.appendChild(event);
    });
});
