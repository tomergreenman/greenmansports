const observerFunction = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            // console.log(entries);
            // if (entry.isIntersecting) {
            //     entry.target.classList.add('Show');
            // } else {
            //     entry.target.classList.remove('Show')
            // }
            entry.target.classList.toggle("Show", entry.isIntersecting)
        })
    },
    // {
    //     rootMargin: "-100px"
    // }
    
    );

export default observerFunction;