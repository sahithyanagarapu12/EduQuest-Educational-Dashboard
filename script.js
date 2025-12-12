// A. DATA: This is our list of lessons.
// Each lesson is an "Object" with a name, a unique ID, and a progress number.
const lessons = [
    { id: 'html', name: 'HTML Basics', progress: 30, description: 'Structure your web page.' },
    { id: 'css', name: 'CSS Styling', progress: 70, description: 'Add colors and layout.' },
    { id: 'js', name: 'JS Interactivity', progress: 0, description: 'Make things happen on click!' }
];


// Find the place in the HTML where we want to show the cards and progress.
const lessonsContainer = document.getElementById('lessons-container');
const overallBar = document.getElementById('overall-bar');
const progressText = document.getElementById('progress-text');


// --- FUNCTION 1: Displaying the Lessons ---
function displayLessons() {
    lessonsContainer.innerHTML = ''; // Clear the area before adding new cards

    // Go through each item in the 'lessons' list (our data)
    lessons.forEach(lesson => {
        
        // 1. Create the entire HTML text for ONE lesson card
        const cardHTML = `
            <div class="lesson-card">
                <h3>${lesson.name}</h3>
                <p>${lesson.description}</p>
                
                <p>Current Progress: <strong>${lesson.progress}%</strong></p>
                
                <button 
                    class="start-button" 
                    data-lesson-id="${lesson.id}"
                >
                    ${lesson.progress > 0 ? 'Continue' : 'Start'}
                </button>
            </div>
        `;

        // 2. Add this HTML card to the lessons container on the page.
        lessonsContainer.innerHTML += cardHTML;
    });
}


// --- FUNCTION 2: Updating the Overall Progress Bar ---
function updateOverallProgress() {
    // 1. Calculate the total progress
    let totalProgress = 0;
    lessons.forEach(lesson => {
        totalProgress += lesson.progress;
    });

    // 2. Calculate the average percentage
    const overallPercentage = Math.round(totalProgress / lessons.length);

    // 3. Update the HTML elements (DOM Manipulation)
    // FIX 1: Must use backticks (`) for template literals
    overallBar.style.width = `${overallPercentage}%`; 
    
    // FIX 2: Must use backticks (`) for template literals
    progressText.textContent = `${overallPercentage}% Complete`; 
}


// --- FUNCTION 3: Handling a Button Click ---
// We listen on the whole container so we don't have to listen on every single button.
lessonsContainer.addEventListener('click', (event) => {
    
    // Check if the thing clicked was a button with the class 'start-button'
    if (event.target.classList.contains('start-button')) {
        
        // Get the unique ID from the button (e.g., 'html', 'css')
        const clickedId = event.target.dataset.lessonId;
        
        // Find the matching lesson in our data list
        const lessonToUpdate = lessons.find(lesson => lesson.id === clickedId);

        if (lessonToUpdate && lessonToUpdate.progress < 100) {
            
            // SIMULATION: Increase progress by 10%
            lessonToUpdate.progress = Math.min(100, lessonToUpdate.progress + 10);
            
            // FIX 3: Must use backticks (`) for template literals
            alert(`Progress for ${lessonToUpdate.name} increased!`);

            // Rerun the functions to update the screen
            displayLessons();
            updateOverallProgress();
        }
    }
});


// --- INITIAL STARTUP ---
// Run these two functions once when the page first loads
displayLessons();
updateOverallProgress();