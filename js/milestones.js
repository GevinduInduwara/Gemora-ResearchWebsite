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
    const element = document.createElement('div');
    element.className = `milestone-item ${milestone.completed ? 'completed' : ''}`;
    element.id = `milestone-${milestone.id}`;
    
    const progressPercent = (milestone.marks / totalMarks) * 100;
    const progressBarWidth = (milestone.progress / milestone.marks) * 100;
    
    element.innerHTML = `
        <div class="milestone-header" data-milestone="${milestone.id}">
            <div class="milestone-icon">
                <i class="fas fa-${milestone.completed ? 'check' : 'ellipsis-h'}"></i>
            </div>
            <div class="milestone-title">
                <h3>${milestone.title}</h3>
                <span class="milestone-date">${milestone.date}</span>
            </div>
            <div class="milestone-toggle">
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
        <div class="milestone-content">
            <p>${milestone.description}</p>
            <div class="milestone-details">
                <div class="milestone-marks">
                    <span>Marks Allocated: <strong>${milestone.marks}</strong></span>
                    <span>Progress: <strong>${milestone.progress}/${milestone.marks}</strong></span>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${progressBarWidth}%" 
                         aria-valuenow="${milestone.progress}" aria-valuemin="0" aria-valuemax="${milestone.marks}">
                        ${milestone.progress}%
                    </div>
                </div>
            </div>
        </div>
        ${index < milestonesData.length - 1 ? '<div class="milestone-connector"></div>' : ''}
    `;
    
    // Add click event to toggle content
    const header = element.querySelector('.milestone-header');
    header.addEventListener('click', () => {
        element.classList.toggle('active');
        const icon = header.querySelector('.milestone-toggle i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
    
    return element;
}

// Initialize milestones
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.milestone-tree');
    if (!container) return;
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Add milestone items
    milestonesData.forEach((milestone, index) => {
        const element = createMilestoneElement(milestone, index);
        container.appendChild(element);
    });
    
    // Open first milestone by default
    const firstMilestone = document.querySelector('.milestone-item');
    if (firstMilestone) {
        firstMilestone.classList.add('active');
        const icon = firstMilestone.querySelector('.milestone-toggle i');
        if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }
});
