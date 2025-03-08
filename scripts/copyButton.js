document.querySelectorAll("code").forEach((el) => {
    const button = document.createElement("button");
    button.innerText = "Copy";
    button.className = "copy-btn"; // Add a class for styling
    button.style.marginBottom = "5px"; // Add spacing

    // Ensure the button is inserted before the code block
    el.parentNode.insertBefore(button, el);

    // Copy functionality
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(el.innerText).then(() => {
            button.innerText = "Copied!";
            setTimeout(() => button.innerText = "Copy", 1500);
        }).catch(err => console.error("Copy failed:", err));
    });
});
