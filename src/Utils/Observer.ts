const observerFunction = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("Show", entry.isIntersecting);
        })
    });

export default observerFunction;