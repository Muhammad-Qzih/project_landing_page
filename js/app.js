
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
// Define Global Variables
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
const backToTopButton = document.createElement('button');

// Add styles for the back-to-top button
const style = document.createElement('style');
style.innerHTML = `
  .back-to-top {
    right: 30px; 
    z-index: 99; 
    border: none; 
    outline: none; 
    display: none; 
    position: fixed; 
    bottom: 20px; 
    background-color: white; 
    color: black; 
    cursor: pointer; 
    padding: 20px; 
    font-size: 18px; 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }

  .back-to-top:hover {
    background-color: #f1f1f1; 
  }
`;

// Append the style to the head
document.head.appendChild(style);

// Set attributes for the back-to-top button
backToTopButton.id = 'back-to-top';
backToTopButton.className = 'back-to-top';
backToTopButton.textContent = 'Top';

// Append the button to the body
document.body.appendChild(backToTopButton);

// Helper function to check if element is in viewport
const isInViewport = (elem) => {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Function to build the navigation menu
const createNav = () => {
  const fragment = document.createDocumentFragment();

  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionName = section.getAttribute('data-nav');

    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.textContent = sectionName;
    anchor.setAttribute('href', `#${sectionId}`);
    anchor.classList.add('menu__link');

    listItem.appendChild(anchor);
    fragment.appendChild(listItem);

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  navbarList.appendChild(fragment);
};

// Function to add active class to section in viewport
const setActiveClass = () => {
  sections.forEach((section) => {
    if (isInViewport(section)) {
      section.classList.add('your-active-class');
    } else {
      section.classList.remove('your-active-class');
    }
  });
};

// Function to show or hide the "Back to Top" button
const toggleBackToTopButton = () => {
  let anySectionInView = false;
  sections.forEach((section) => {
    if (isInViewport(section)) {
      anySectionInView = true;
    }
  });

  if (anySectionInView) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
};

// Event listener for the "Back to Top" button
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Build menu 
createNav();

// Set sections as active on scroll
document.addEventListener('scroll', () => {
  setActiveClass();
  toggleBackToTopButton();
});
