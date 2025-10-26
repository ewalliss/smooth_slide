// Wait for images to be loaded before initializing drag functionality
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('image-track');
  
  // Track initialization
  let isInitialized = false;
  
  function initializeDrag() {
    if (isInitialized) return;
    
    window.onmousedown = e => {
      track.dataset.mouseDownAt = e.clientX;
    }

    window.onmouseup = e => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    window.onmousemove = e => {
      if(!track.dataset.mouseDownAt || track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
      
      const percentage = (mouseDelta / maxDelta) * -100;
      let nextPercentage = parseFloat(track.dataset.prevPercentage || 0) + percentage;
      nextPercentage = Math.min(0, nextPercentage);
      nextPercentage = Math.max(-100, nextPercentage);
      
      track.dataset.percentage = nextPercentage;

      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

      for (const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
          }, { duration: 1200, fill: "forwards" });
      }
    }
    
    isInitialized = true;
  }
  
  // Initialize after a short delay to ensure images are loaded
  setTimeout(initializeDrag, 100);
  
  // Also initialize when window loads
  window.addEventListener('load', initializeDrag);
});
